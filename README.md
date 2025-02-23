<h1 align="center" style="font-weight: bold;">🚗 SAFEDRIVE 🚗</h1>
<p align="center">
    <b>A simple mini-mini web project using Smart Contracts!</b>
<p>

---



### 🏃‍♂️ How to run locally
1.  #### You will need [Node JS](https://nodejs.org/en/download) (preferrably latest version, as older versions _may_ not run properly).
2. #### Download [the repository's zip file](https://github.com/ffelipeoliveira/safedrive/archive/refs/heads/main.zip).
3. #### Downloading the Backend
   1. Open a terminal and enter `backend`, you can do it using `cd backend`.  
   2. Type `npm install` and await until it finishes installing the node modules.
4. #### Running the Backend
   ⚠ You will need to set up an .env of your own, it will include an `PRIVATE_KEY`, `RPC_URL` and an `CONTRACT_ADDRESS`
   1. Type `npx hardhat node` to initiate the local Blockchain, **keep this terminal open**.
   2. In another terminal, type `npx hardhat run ignition/modules/deploy.js --network localhost` to deploy smartcontract on the network
   3. Type `node app/server.js` to initiate a local server to the Blockchain, **keep this terminal open**.
   
   
5. #### Downloading the Frontend
    1. In another terminal `frontend`, you can do it using `cd frontend`.  
    2. Type `npm install` and wait until it finishes installing the node modules.
6. #### Running the Frontend
    ⚠ You will need to set up an .env of your own, check up on how to set up an Firebase!
    1. Type `npm run dev`, **keep this terminal open**.
    2. The link will appear on the terminal, copy and paste it on your browser
    
### ⏰ Changelog:
	ver 0.1: Added base project
	ver 0.2: Added most of the frontend, minigame and signin
	ver 0.3: Bug fixes, the version used for the first presentation
	ver 0.3.5a: Readme, bug fixes, overall better project
    ver O.3.5b: Bug fixes
**🌟 Shoutout to [Irradiance730](https://www.youtube.com/@irradiance730) for his amazing React Three Fiber tutorials!** 