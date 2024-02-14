# Simple API with AWS Services 🚀

## Description
This project is an API service built using TypeScript, allowing users to perform CRUD (Create, Read, Update, Delete) operations with MongoDB as the database. It encompasses three different models: Products, Categories, and Users. Each Product can be associated with a Category and an Owner (User).

Additionally, the project integrates with three different AWS services: SQS (Simple Queue Service), Lambda, and S3 (Simple Storage Service). 

Whenever a new product is created, deleted, or updated through the API, a message is sent to an SQS queue. Subsequently, an AWS Lambda function listens to this queue, retrieves the message, accesses the MongoDB database to fetch updated product data, and then saves it in a JSON file within an S3 bucket. 

When a GET request is made to the API, it retrieves the JSON file from the S3 bucket.

## Technologies Used 🛠️
- TypeScript
- MongoDB
- AWS SQS 
- AWS Lambda
- AWS S3

## Usage 📋
- Perform CRUD operations on Products, Categories, and Users through the API endpoints.
- Access updated product data via GET requests.
  
## AWS Lambda Setup ☁️
This folder is solely meant for creating and configuring the Lambda function to be imported into AWS. Hence, it resides outside the `src/` directory and has its own `package.json` and `node_modules/`.

---

The core function resides in the `lambda/index.ts` file. Once the configuration/alteration of the function is complete, execute the `build` script from the `package.json` file. This script will transpile the function to the `dist/` folder, then copy the files `package.json` and `package-lock.json` to the `dist/` folder, and install all production packages from the package files, and at last it will create a file named `aws/aws.zip`, which you should import to the AWS Lambda console.