![GA Logo](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)

# Photo Site

📸🌉📷🏯📸🗽📷🏰📸🎇📷🌇📸🌄📷🌋📸🗻📷🌅📸🏕📷🌈📸

Type: Homework, 2-day<br>
Competencies: Full CRUD in Express with Mongoose - 2 Model <br>
Idea/website credit goes to Kaylie Weable: https://picblog.herokuapp.com<br>
Adapted for wdi-cc by Reuben Ayres<br>

For the next two evenings, you will be creating a **two-model CRUD application** with Express, Mongoose & MongoDB where users can post and view each others photos.


## Breakdown

- Day 1: Full CRUD for Photo model.
- Day 2: Create the `User` model and connect it to the first one, go back and update the `Photo` model and routes and templates to account for the new relationship.


## Setup & Commits

**Fork and clone this and build the project in the forked-and-cloned directory**.

There should be at least a couple dozen commits for this by the time you finish.


# Day 1: Photos

## Model & Schema: `Photo`

When creating a schema for `Photo`, think about validations. What do you want to be required (the URL?  a title?  some sort of name for the user?).

## `Photo` & `/photos`

### Index

The home (index) page should show all of the pictures that have been submitted.

### New & Create

There should be a page to add a new photo.

Think about how you're going to allow the user to enter the following:

1. their username (required)
2. the url of a photo hosted online somewhere (you won't be storing any photos, just storing the URL) (required)
3. Information about the photo (not required for the user to fill out, but required for you to enable them to if they want 🙂)

### Show

There should be a page to show the individual photo.

If there is a description that comes with the photo, this should be displayed as well.

This page should have a button that could take you to a page to **edit** or **delete** the photo.

### Edit, Update, Destroy

If you click on button to **edit** a photo, it should take you to an edit form.

If you click on the **delete** button, the photo should be deleted.


### CSS

Use Bootstrap or just CSS3 and elbow grease (or go out and find another CSS library: Skeleton? MaterialUI (be sure not to get)) to make it look awesome.  Any kind of awesome you want, just make it look awesome. 

**Do this today, but after you get Photo crud finished**. You won't have time tomorrow, tomorrow night's tasks are more complex and will require a bit of refactoring.



---

# Day 2


## Model & Schema: `User`

When creating a schema for `User` think about validations. What do you want to be required (maybe the password?) and what do you want to be unique (maybe the username?).  We also want User to be _associated_ with Photo.  How to implement that?

## `User` & `'/users'`: The app

### Index

There should be a page that you can access from the home page to see all of the users (displaying just the username is enough, but feel free to get creative here).

**2-Model - Think about it:**
You don't need to worry about photos here - it's all about the users.

### New & Create

There should be a page to add a new user. It should take a username and password. Don't stress about password security, plain text is fine for now (we'll learn how to encrypt them tomorrow). You might consider this a "Registration" page!

**2-Model - Think about it:**
You don't need to worry about photos here - it's all about the users. But remember, a user has to be created before they can add a photo!

### Show (and edit?)

There should be a show page for the user's photos. On this page, you should be able to see the user's username, all pictures that this particular user has posted, and their photo information.

There should also be a button to either **edit** or **delete** the user, ___if that user is the one logged in.___

**2-Model - Think about it:**
Is the user’s id a part of the route? In which case there would be two params for one user’s particular photo. Would that look like `/users/1/8` or like `/photos/1/8`?


### Edit, Update, and Destroy

If you click on button to **edit** a user, it should take you to an edit form, ___if that user is the one logged in.___

If you click on the **delete** button, the user should be deleted, ___if that user is the one logged in.___  This might be analogous to "delete account."


**2-Model - Think about it:**
If we delete a user, we also need to delete their photos. Will that automatically happen when we delete the user?



## Revisiting `Photo`

### Index

Might be nice to have the username that's associated with a photo show up with the photo.  Also, in the edit/destroy/update section below, you'll be guided to come back here and add edit/delete buttons/links.  But you can hold off on that for now.


### New & Create

Photo URL will still be required, and description will still be optional.  But you now have access to sessions, which you can use to "figure out" who is logged in.  Then you know which User to store the photo "in." 

We have to consider the users here. The user should be created before they can add a photo. Your users should be linked to their photos using model relationships as demonstrated in class. If someone wants to add a photo and they're not logged in, don't let them!  Maybe suggest that they create an account. 


### Show

Showing one photo should still be pretty easy, but again, we should think about the route. Does the route correspond to the user id or is it independent of the user model?


### Edit, Update, and Destroy

If you click on button to **edit** a photo, it should take you to an edit form, **unless** you're not the owner of this photo. In that case perhaps don't even show an edit link?  

If you click on the **delete** button, the photo should be deleted, again, **unless** it's not yours.  Maybe only the owner of the photo should be able to see the delete button?

Should these buttons go on the Index page?  Or on the Show page?

Updating and deleting photo seemed pretty straightforward just for the main Photo model by itself. But should it also reference the user and the user’s array of embedded photos?  You may need to update the data in multiple places!





# Hungry for more?

## Seed Data

After you set up your models, consider making some seed data to help test your application.

## Read about encypting passwords with bcrypt (which we'll cover tomorrow)

- [bcrypt](https://codahale.com/how-to-safely-store-a-password/)

- [bcrypt on npm](https://www.npmjs.com/package/bcrypt)

## Free user testing

Show the app to someone. Classmate, partner, relative, co-worker, someone that's around.  Ask them for very candid usability feedback.  Classic story, right? You'll think you've hammered out all the kinks, but users will always come up with amazing ways to cause a site to "break" that!  Reconfigure to implement the feedback that you think is useful!

## Likes

This is more challenging than it looks when you casually use it on social media sites.  But how might you implement it?  See what you can come up with on your own!  
