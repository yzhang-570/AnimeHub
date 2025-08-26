<a href="https://graceful-platypus-f3b0b6.netlify.app">![image](https://github.com/user-attachments/assets/afb5a554-2164-47c4-9589-095e6cc79cd4)</a>
<br></br>
A forum for where users can share about and discuss their love for anime.

## Features
* Account creation through email or Google and option to continue as Guest
* Creating, editing, and deleting your own posts
* Selecting from up to 13k+ different anime topics from Jikan API to assign to posts
* Interacting with others' posts via likes and comments
* Sorting posts using filters and searching posts by title

**Future goals**
* Develop user profile page
* Allow browsing posts by topic
  
## Showcase
<table>
  <tr>
    <td><img width=500 src="https://github.com/user-attachments/assets/eccd7b6d-ba10-49a1-89a0-edfa993b5826"/></td>
    <td><img width=500 src="https://github.com/user-attachments/assets/d9eba0b0-18ba-4a86-956a-28157efcff4b"/></td>
  </tr>
  <tr>
    <td><img width=500 src="https://github.com/user-attachments/assets/0c07375b-f612-4a6c-b24b-f05ce53b2575"/></td>
    <td><img width=500 src="https://github.com/user-attachments/assets/739dbb8c-31e6-4589-8225-2732ab3241e8"/></td>
  </tr>
</table>

## Getting Started
1. Install dependencies
```bash
npm i
```

2. Set up environment variables
```bash
#create a .env file in the root folder and initialize the following 2 variables

VITE_SUPABASE_URL=[insert your project url]
VITE_SUPABASE_KEY=[insert your anon key]
```

3. Run locally
```bash
npm run dev
```

## Built With
![React.js](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Supabase](https://img.shields.io/badge/Supabase-36d421?style=for-the-badge&logo=Supabase&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## Acknowledgements
- Jikan API - database providing anime titles and information
- reactjs-popup - modals and popups
- Flaticon - icon images on buttons
