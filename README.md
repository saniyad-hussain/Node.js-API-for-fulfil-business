# Fulfil-api

| Branch  | Status                                                                                                                                                                   | Semaphore                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Master  | [![Build Status](https://semaphoreci.com/api/v1/projects/8a21e236-ea0c-4898-b474-8bdd53290b91/2743185/shields_badge.svg)](https://semaphoreci.com/fulfil0518/fulfil-api) | https://semaphoreci.com/fulfil0518/fulfil-api/servers/production |
| Staging | [![Build Status](https://semaphoreci.com/api/v1/projects/8a21e236-ea0c-4898-b474-8bdd53290b91/3045136/shields_badge.svg)](https://semaphoreci.com/fulfil0518/fulfil-api) | https://semaphoreci.com/fulfil0518/fulfil-api/servers/staging    |

## Deployment

we are using google cloud for deployment. we are using two server for deployment
first is **staging** and second is **production**. below are the steps that
needs to follow.

### Developer Needs to follow:

1. Create a new branch from staging. Add new feature or change existing code
   (add SQL file in migration directory if any schema changes are there) and
   push it to git.
2. Create new pull request (if your branch doesn’t found any issue I mean it is
   successfully follow all the steps of our CI pipeline). select base branch as
   staging and select reviewer as your teammates in PR.
3. Once your PR gets approve by reviewer then he/she will merge your code to
   staging branch.
4. Once PR gets merged. we have setup semaphore pipeline
   (https://semaphoreci.com/fulfil0518/fulfil-api/servers/staging) to do
   deployment on google cloud. Basically semaphore will create new docker image
   then run test-cases then push image to google cloud. Once image pushed to
   google cloud. Particular image is connected with instance template. That
   instance template is connected with instance group (collection of multiple
   virtual machine where load balancer is connected). Finally semaphore will
   restart our instance group so virtual machine takes latest image and run it
   on server by that way we have a latest image to be in running mode. You can
   check version {{domain_name_or_ip_address}}/version.

   example: http://api.fulfil.store/version

**NOTE:**

1. Don't create pull request directly to master branch.
2. Don't do any schema changes in production db.

### Project Manager / Team leader Needs to follow:

1. Create new pull request. select base branch as master and merge all staging
   branch code to master.
2. Apply sql changes to production db manually from migration directory.
3. Once PR gets merged to master. Semaphore pipeline gets trigger and it will
   create new production image then fire test cases and then pushed images to
   google cloud. Docker image is attached with instance template and instance
   template is connected with instance group (collection of multiple virtual
   machine where load balancer is connected).
4. Here latest docker image can't be applied automatically on a virtual machine
   until we do Rolling restart / Rolling replace of our instance group in Google
   Cloud (This step needs to be performed manually).

**NOTE:**

1. Don't merge any branch directly to the master.
2. Kindly post a message to the slack channel i.e. #cloud-deploy-announce
   regarding the production merge. So that other team stopped their work on
   production server.

### API

The API is built using Sails. To add an endpoint simply run:

```javascript
 sails generate api <mysql table name>
```

Sails will create a model and controller. You will need to specify the fields in
the model which correspond to the db table. Sails is restful. Meaning to get
data do a GET request. To insert data do a POST. To change use UPDATE. To remove
use DELETE.

### Sails Links

- [Get started](https://sailsjs.com/get-started)
- [Sails framework documentation](https://sailsjs.com/documentation)
- [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
- [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
- [Community support options](https://sailsjs.com/support)
