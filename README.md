# Welcome to Amplitude.v2
A simple music app made with expo + react native.

## Get started

1. Install dependencies:
   Run `_init.bat`;

2. Start app + server:
   Run `_run.bat`

3. Update packages if needed:
   Run `npx expo install --fix`

OR

1. `[open cmd in root folder] => npm install && cd server && npm install && cd .. && npm run start`
2. `[open cmd in root/server folder] => npm run dev`


- [How to setup your own S3 bucket](https://www.youtube.com/watch?v=eQAIojcArRY)

***(root dir) .env***
```
ACCESS_KEY=...
SECRET_ACCESS_KEY=...

BUCKET_NAME=...
BUCKET_REGION=...
SONG_IMAGE_FOLDER_PATH=...
SONG_AUDIO_FOLDER_PATH=...

MONGO_URI=...
FRONTEND_IP=...
LOCAL_IP=...
PORT=...

EXPO_PUBLIC_FRONTEND_IP=...
EXPO_PUBLIC_LOCAL_IP=...
EXPO_PUBLIC_PORT=...

JWT_SECRET_KEY=...
```

---

### Technologies used
- Bruno (API testing, like postman or insomnia)
- React native + expo (frontend)
- MongoDB (database)
- AWS S3 (file storage)
=> AMERN or MERNA stack (invented by me)

### Other Technologies used
- [HaiKei](https://haikei.app/) (Used to generate the epic svg backgrounds seen in the app)

### Why I used these technologies
- **React Native** + **Expo** is an obvious one.
- I've never used **MongoDB** before and thought it would cool to make a project with it.
- Since **MongoDB** is document based and has limitations storing files (it took 30s to receive ±2mb files stored in binary), and while I could've used the **GridFS_API** provided by them. I decided to use and learn **AWS S3** + it's a really valuabe skill.

---

### Features
- Signup/Login/Auth [WIP]
- Upload/Play/Edit/Delete songs
- Settings + Profile pages
- Light/Dark mode *(works but light mode is disabled)*

#### Most Notable Packages Used:
- [DocumentPicker](https://www.npmjs.com/package/expo-document-picker)
- [ImagePicker](https://www.npmjs.com/package/expo-image-picker)
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [SecureStore](https://www.npmjs.com/package/expo-secure-store)
- [Reanimated](https://www.npmjs.com/package/react-native-reanimated)
- [Expo Audio](https://www.npmjs.com/package/expo-audio)
- [Slider](https://docs.expo.dev/versions/latest/sdk/slider/)
- [Yup](https://www.npmjs.com/package/yup) (frontend validation)
- [Formik](https://formik.org/)

<br>

- [Express](https://www.npmjs.com/package/express)
- [Express/CORS](https://www.npmjs.com/package/cors)
- [Express/Multer](https://www.npmjs.com/package/multer) (file upload middleware)
- [Express/Rate-Limit](https://www.npmjs.com/package/express-rate-limit)
- [Express/Morgan](https://www.npmjs.com/package/morgan) (logging)
- [MongoDB](https://www.npmjs.com/package/mongodb)
- [AWS S3](https://www.npmjs.com/package/@aws-sdk/client-s3)
- [UUID](https://www.npmjs.com/package/react-native-uuid) (for generating rand ids + tokens)
- [Sharp](https://www.npmjs.com/package/sharp) (image processing)
- [Axios](https://www.npmjs.com/package/axios)
- [Joi](https://www.npmjs.com/package/joi) (backend validation)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) (password hashing)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)

##### Known issues
- While editing works, even if the files are the same they get overriden => time + resources are wasted. While I can fix this by checking if the old/new md5 hashes have changed, im lazy for that + this app is not for public use :)
- Some errors are not handled (especially network issues)
- Not inherently an issue, but the code could be more consistent and cleaner.
- Expo audio is sometimes glitchy with `loop`, `isPlaying`, `volume` states.
- Light theme is ugly, need to play around with colors.
- Some minor (hopefully) bugs may introduce themselves due to me not testing individual components.

##### Solved Issues
- Due to the way expo handles local files, I cant get the file info during editing, so I cant provide the input with the file name and size (thats why i just show `Change [Image/Audio] File`). [SOLVED]
  - Solution: By using the deprecated legacy version of `expo-file-system`, I was able to extract the file info.