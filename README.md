# TO-UR-WORLD

>a project about tour website that can be at middle between a customer
and a tourist 


### install package
```
#for backend
npm install

# for frontend
npm run client-install
```

### start server with command
```
# for backend
npm run server

# for frontend
npm run client

```

### start server with concurrently both frontend and backend
```
npm run dev
```

###backend api now
###user
you don't need to add localhost:5000 just fetch /user
we seting in json that proxy already
```
# return all user
localhost:5000/user/

# signup
localhost:5000/user/singup

# login WITH TOKEN
localhost:5000/user/login

# return current user
localhost:5000/user/current

# check user login
localhost:5000/user/secret
```