<h1>Project 4 - nightowl</h1>

<h3>Project Overview:</h3>

For this project we were tasked with creating a full stack React app using a Django REST Framework to serve data from a PostgreSQL database


<h3>Technologies Used</h3>

* React.js
* Axios
* Bulma
* SCSS
* Nodemon
* React Router Dom
* Python
* Django
* Django REST Framework
* Psycopg2
* pyJWT
* Yarn
* Insomnia
* Git/ GitHub
* Heroku


<h3>Planning</h3>

Initially I was unsure as to whether I should attempt this project solo or as part of a group as my past experiences with groups had been successful, but after encouragement from my teachers at GA I decided to go solo to prove what I can do by myself. 

The idea for this app came from an idea I had many years ago at university where I noticed there’s no clear bar finder with reviews to know where to go if you’re new to the area or want to find where you could find local deals. Therefore I decided to create something I had wanted for many years previously but had no idea how to.

The plan was to have six different parts: Bars, Bar reviews, (Bar) Deals, Events, Event Review and Users.

I intended to include both one to many relationships as well as many to many relationships in this project. I was however, conscious of the timeframe to complete this project considering I was solo and therefore decided to keep a similar theme, for both bars and events almost mirroring each other.


I then drew up a basic wireframe of the user interacting with the website so I could better understand the user flow through the application. This can be seen below:

<img width="1043" alt="Screenshot of user flow" src="https://user-images.githubusercontent.com/77836499/117735676-d8f17380-b1ed-11eb-8bb0-972912ac62ca.png">


<h3>Set-up</h3>

To get started i ran the following commands to get a basic django app running from within my applications folder:

`pipenv install django`
From the Terminal within the app:
`pipenv shell`
From within the shell:
`django-admin startproject project .`
`pipenv install pylint`
`touch .pylintrc`

From here I navigated into the settings.py and added a database with my own name and ran `pipenv install psycopg2-binary`

Then I ran `createdb night-owl` to create a database for my project.



<h3>Backend</h3>

I decided to first start on the backend and try to get everything working there first before moving onto the frontend.

To begin I started with adding in an authenticated user model using JWT adding in a model like below:

```
from django.db import models
from django.contrib.auth.models import AbstractUser
 
class User(AbstractUser):
   email = models.CharField(max_length=50, unique=True)
   first_name = models.CharField(max_length=50)
   last_name = models.CharField(max_length=50)
   profile_image = models.CharField(max_length=300)
 

```

From here I kept building out some basic authentication shown below. This would allow me to grab the token from the request, throwing an error if not, extracting the payload, then grabbing the user from the database using that payload and check if they were valid and existed.

```
class JWTAuthentication(BasicAuthentication):
 
   def authenticate(self, request):
       header = request.headers.get('Authorization')
       if not header:
           return None
      
       if not header.startswith('Bearer'):
           raise PermissionDenied(detail='Invalid Auth token')
 
       token = header.replace('Bearer ', '')
 
       try:
           payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
           user = User.objects.get(pk=payload.get('sub'))
       except jwt.exceptions.InvalidTokenError:
           raise PermissionDenied(detail='Invalid token')
       except User.DoesNotExist:
           raise PermissionDenied(detail='User not found')
 
       return (user, token)

```

I then continued building this fully out as a way for users to register as well as a way for users to login. A snippet of code has been added below to show part of this. This would allow me to grab the email and password off the request, followed by attempting to grab the user from the database. This would then check the password against the hashed version in the database and if successful generate a token (and expiry of 7 days) to return to the user to login with.

```
class LoginView(APIView):
 
   def post(self, request):
       email = request.data.get('email')
       password = request.data.get('password')
 
       try:
           user_to_login = User.objects.get(email=email)
       except User.DoesNotExist:
           raise PermissionDenied(detail='Invalid credentials')
       if not user_to_login.check_password(password):
           raise PermissionDenied(detail='Invalid credentials')
 
       dt = datetime.now() + timedelta(days=7)
 
       token = jwt.encode(
           {'sub': user_to_login.id, 'exp': int(dt.strftime('%s'))},
           settings.SECRET_KEY,
           algorithm='HS256'
       )
 
       return Response({ 'token': token, 'message': f'Welcome back {user_to_login.first_name}'})
 

```


After constructing a basic user model to login and out with I build out the core functionality of my application, starting with the bars. I created a model shown below (note the events and owner were put on after)

```
from django.db import models
 
class Bar(models.Model):
   name = models.CharField(max_length=50)
   image = models.CharField(max_length=300)
   description = models.CharField(max_length=300)
   fb_link = models.URLField(max_length=300)
   twitter_link = models.URLField(max_length=300)
   instagram_link = models.URLField(max_length=300)
   tags = models.CharField(max_length=50)
   events = models.ManyToManyField('events.Event', blank=True, related_name="bars")
   owner = models.ForeignKey(
       'jwt_auth.User',
       related_name='created_bars',
       on_delete = models.CASCADE
   )

```

After building out the model and serializer I began work on building out the requests to my database. I’ve added a snippet of the GET request for all bars as well as a POST request for adding a bar below.

```
class BarListView(APIView):
   permission_classes = (IsAuthenticatedOrReadOnly,)
 
   def get(self, _request):
       bars = Bar.objects.all()
       serialized_bars = PopulatedBarSerializer(bars, many=True)
       return Response(serialized_bars.data, status=status.HTTP_200_OK)
 
   def post(self, request):
       request.data["owner"] = request.user.id
       bar_to_add = BarSerializer(data=request.data)
       if bar_to_add.is_valid():
           bar_to_add.save()
           return Response(bar_to_add.data, status=status.HTTP_201_CREATED)
       return Response(bar_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

 The other models worked in similar ways to these using serializers as well as a permission class to check if users to authorised to run specific requests such as only an owner being able to make an edit request. Building out these models involved both a many to many relationship between the bars and events as well as several many to one relationships for the reviews and the deals.

As I was going through these requests I was consistently checking them using Insomnia, to make sure they all worked as intended.

<img width="1329" alt="Screenshot 2021-05-10 at 23 00 38" src="https://user-images.githubusercontent.com/77836499/117735680-dbec6400-b1ed-11eb-9353-d385dfedb0de.png">



<h3>Frontend</h3>

Once I was content that all the routes I needed to reach MVP were working correctly I made a start on my frontend. To begin I used the command `npx create-react-app client --template cra-template-ga-ldn-projects`, as well as `yarn add http-proxy-middleware` in the client terminal to add a proxy-middleware to be used. From here I could just use `yarn && yarn start` to run my client side.

To start off building out the client side I decided to hook up the navbar to my homepage to get off to a good start. Similar to previous projects I set up `Route`s within the App.js and set up `Link`s from within the Navbar, building out some basic components initially showing no data, just so I knew that each link was directing correctly.

**Bar Index/ Event Index** - I have decided to group these two together as the code and functionality were intended to be very similar. They both used `useEffect` and `useState` to grab all the data from a GET request to the backend and then return the name, tags and a picture in the JSX. Each bar would be wrapped in a `Link` which would allow the user to click on it bringing them to a Bar Show page for that individual bar.

```
 const [bars, setBars] = useState([])
 
 useEffect(() => {
   const getData = async () => {
     const { data } = await axios.get('api/bars/')
     setBars(data)
   }
   getData()
 }, [])
//JSX return
{bars.map( bar => (
         <>
           <Link to={`bars/${bar.id}`} key={bar._id}>
             <div className="section" key={bar._id}>
 
               <h1 h1 className="title is-3 white-text">{bar.name}</h1>
               <p className="white-text">{bar.tags}</p>
               <br/>
               <p className="white-text">{bar.description}</p>
               <img src={bar.image} width='100%' />
 
             </div>
           </Link>
           <hr className="line-break-white"/>
         </>
       ))}
 

```

**Bar/ Event Show** - These Components initially were set up to simply pull and display the data using a GET request from the backend, which included the basic information as well as their relationships of deals (in the case of bars), any events going on at the bar (and vice versa) and any reviews that had been left and their owner. This page also allowed for owners to delete or edit their page from here, add new deals, and leave comments although these were separate components. These all contained ternary statements which required the user to be the owner in order to commit these changes. For example the JSX code below shows the deal data related to that bar being displayed and an additional delete button if the user was also the owner of that bar.

```
{ bar.deals &&
     <>
       <h3 className="subtitle is-3 white-text">Weekly Deals</h3>
       <div className="deals-section">
         { bar.deals.map( deal => (
           <div className="individual-bar-deal" key={deal.id}>
             <h4 className="title is-4 white-text">{ deal.day_of_the_week }</h4>
             <h5 className="subtitle is-5 white-text">{ deal.description }</h5>
             { userIsOwner(bar.owner.id) &&
             <>
               <br/>
               <button onClick={handleDealDelete} value={deal.id} className="button is-danger is-outlined is-small home-button">Delete Deal</button>
             </>
             }
           </div>
         ))}

```



<h3>Polishing Touches</h3>

One of the first things I added in was making the login and register pages a modal. When considering the user flow I realised it would be frustrating to see a prompt to log in to leave a review and then have to navigate to a login page and back again, therefore I set up these as a modal so that the user could seamlessly navigate through this. To do this I used a small bit of state as well as an `onClick` function to make the modal active.

```
 const [isActive, setIsActive] = useState('')
                   <a onClick={() => setIsActive(!isActive)} className="navbar-item">
                     <strong>Log in</strong>
                   </a>
                   { isActive === true &&
                     <div className="modal is-active">
                       <div className="modal-background" onClick={() => setIsActive(!isActive)}></div>
                       <div className="modal-content">
                         <Login
                           setIsActive={setIsActive}
                           isActive={isActive}
                         />
                       </div>
                     </div>
                   }

```

After adding this in and touching up some of the styling I decided to add in a voting system upon the reviews. Inspired by the upvote system of Reddit I figured that reviews that people agreed with would be upvoted and therefore a much more reliable review. To do this I started in the backend extending out my Bar Review model to have a likes, dislike and funny model added on.

```
class Bar_Review(models.Model):
   text = models.TextField(max_length=1000)
   created_at = models.DateTimeField(auto_now_add=True)
   bar = models.ForeignKey(
       "bars.Bar",
       related_name="bar_reviews",
       on_delete= models.CASCADE
   )
   owner = models.ForeignKey(
       "jwt_auth.User",
       related_name="bar_reviews",
       on_delete = models.CASCADE
   )
   likes = models.ManyToManyField(
       settings.AUTH_USER_MODEL,
       default=None,
       related_name='bar_review_like')
   dislikes = models.ManyToManyField(
       settings.AUTH_USER_MODEL,
       default=None,
       related_name='bar_review_dislike'
       )
   funny = models.ManyToManyField(
       settings.AUTH_USER_MODEL,
       default=None,
       related_name='bar_review_funny'
       )
```

Next I added in a class which would allow the user, if authenticated, to add themself to an array of users that liked that comment. If they were already on this array, they would instead remove themself from it. After recreating this for the other two and adding this into the urls.py users could now like, dislike or add funny to comments.

```
class BarReviewLike(APIView):
   permission_classes = (IsAuthenticated,)
 
 
   def get(self, request, pk):
       try:
           bar_reveiew_to_like = Bar_Review.objects.get(pk=pk)
       except Bar_Review.DoesNotExist:
           raise NotFound()
       if request.user in bar_reveiew_to_like.likes.all():
           bar_reveiew_to_like.likes.remove(request.user)
           return Response(status=status.HTTP_201_CREATED)
       else:
           bar_reveiew_to_like.likes.add(request.user)
           bar_reveiew_to_like.save()
           return Response(status=status.HTTP_201_CREATED)

```

Next I added in a simple request to the database in the frontend which would allow the user to add themself to the array, resulting in the `array.length` increasing by one. I could then use this to display the total number of votes.

```
 const likeBarReview = async (event) => {
   await axios.get(`/api/barreviews/${event.target.value}/likes/`, {
     headers: {
       Authorization: `Bearer ${getTokenFromLocalStorage()}`,
     },
   })
   window.location.reload()
 }

```


<h3>Styling</h3>

Conscious of the timeframe to produce the application I decided to use a Bulma framework and found that the second time round it was far quicker to use. One of the main reasons I decided to use this was to try to make the app as responsive as possible while not having to spend too much time manually coding this in. 

As this was an application aimed at nightlife I decided to go with primarily dark colours across the board to keep in line with the pictures of events and bars. I also decided against using a card to display the data as I had previously used these in my last two projects and wanted to challenge myself to display the data in a different way.

<h3>Challenges</h3>

**Time Management** - Accomplishing everything within a short timeframe proved to be tough for a solo project. I had a lot of ideas for things I wanted to include to this project and felt that given another few days I could achieve these, but the main barrier working against me was time.

**Working Solo** - I found although I am quite happy to work solo, it certainly can help having another pair of eyes on the code and speed up some of the more menial tasks. Where in previous projects I could take more time to read documentation to learn how to best approach a potential problem, I no longer had quite as much time nor someone to discuss my thoughts with.

<h3>Wins</h3>

**A working application** - The app worked fairly well as I was able to reach MVP and add in a couple post-MVP features I really hoped to like the like/ dislike components.

**Design** - As someone who came into GA thinking they didn’t have a creative bone in their body, I was pleased with how the application came out. I think that although I would’ve liked to have sharpened up the individual bars/ events pages, the theme was in line with the purpose of the app and came out looking good.

<h3>Future Enhancements</h3>

* The like/ dislike feature not refreshing the entire page on click
* Addition of mapbox so you can see all bars or deals on a map
* Search/ filter option on the index pages
* The ability for a bar to link an event to it

<h3>Key Learnings</h3>

* Python - This was my first proper experience of writing Python, which really helped cement some fundamentals. 
* Django - It was also my first experience of using Django, which I enjoyed and can now better understand the pros and cons of using it compared to Mongo in my project 3.
