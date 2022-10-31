# 4885_Buddy

<!--
**Firebase update:**  
You need to remove the `4885_Buddy` folder from your *local* computer first, and reopen it through MAMP.  

### Steps:
1. Open where the `4885_Buddy` folder is on your computer, e.g. `User > Documents > GitHub > 4885_Buddy`, and trash it.
2. If you open GitHub Desktop, you should get a "Can't find 4885_Buddy" message. You can click `Remove`.
3. Clone the repository again:  
<img src="https://user-images.githubusercontent.com/25330392/193745183-dc7e8f9a-d549-4a80-ab34-6703b35cc960.png" width="420">

4. For the folder destination, **make sure you put it inside your MAMP folder's `htdocs`**:  
<img src="https://user-images.githubusercontent.com/25330392/193745699-4cd3d419-1de0-4548-82ee-61d075fff8f9.png" width="500">  

⭐ **do not** use the `User > Documents > GitHub` folder location.

5. Start MAMP.

6. Go to `localhost:8888/4885_Buddy`. You should see this:  

![image](https://user-images.githubusercontent.com/25330392/193746250-e9d4949f-3f10-45db-9b79-fd78e87c3ca1.png)  

7. Click `main.html` and you should see the homepage:  
[[prev ver, old](https://user-images.githubusercontent.com/25330392/193746578-638558d0-f450-4fb2-bece-32f6f802ea94.png)]  
<img src="https://user-images.githubusercontent.com/25330392/196013655-38b8754a-3504-4d1d-93f4-85e61de824fa.png" width="420">  

---
-->

**Oct 30th update:**  
`search.html` &mdash; We're now using a tomtom plugin that helps with automated suggestions as the user types their query into the searchbox:  
[developer.tomtom.com/maps-sdk-web-js/tutorials/basic/searchbox-integration](https://developer.tomtom.com/maps-sdk-web-js/tutorials/basic/searchbox-integration)  

As such, we need to install npm for the search page to work properly.  

Open `htdocs > 4885_Buddy` in your Finder/File Explorer, then open it in terminal:  

**Mac:**  
(Right-click the `4885_Buddy` folder > `New Terminal at Folder`)  
<img src="https://user-images.githubusercontent.com/25330392/198928902-a11e60e7-32ca-4b16-840e-0fe12691f5e4.gif" width="720">  

**Windows:**  
<img src="https://user-images.githubusercontent.com/25330392/198929121-e7b94a09-b7fa-4db6-a070-3eff124006bd.png" width="269">  

Type `npm i` to install. 🎉  

When it's done, hard-refresh `search.html`. If you can see the events, congrats!

---

### Credits:

Images used:  
[github.com/ansonsow/4885_Buddy/tree/main/images](https://github.com/ansonsow/4885_Buddy/tree/main/images)  

**Slideshow images:**
* [unsplash.com/photos/cuKJre3nyYc](https://unsplash.com/photos/cuKJre3nyYc)
* [unsplash.com/photos/hTv8aaPziOQ](https://unsplash.com/photos/hTv8aaPziOQ)
* [unsplash.com/photos/T22nibt5XvI](https://unsplash.com/photos/T22nibt5XvI)
* [unsplash.com/photos/Nwc-Z3_aEvw](https://unsplash.com/photos/Nwc-Z3_aEvw)

**Header image:**
* [unsplash.com/photos/I9j8Rk-JYFM](https://unsplash.com/photos/I9j8Rk-JYFM)

**Profile page:**
* Ryan: [unsplash.com/photos/3JmfENcL24M](https://unsplash.com/photos/3JmfENcL24M)

**Login page:**
* [unsplash.com/photos/2LhCDvS_7xs](https://unsplash.com/photos/2LhCDvS_7xs)
