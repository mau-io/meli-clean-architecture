# MeLi-Clean-Architecture

This project is designed to provide a clean architecture for the MeLi API.

## Prerequisites

- Node.js 20.0.0 or above

## Run Locally

1. Clone the project
```bash
git clone https://github.com/mau-io/meli-clean-architecture.git
```
2. Go to the project directory
```bash
cd meli-clean-architecture
```
3. Install dependencies
```bash
npm install
```
4. Start the server
```bash
npm run start
```

## Environment Variables

This project uses Node.js and Express.js. To run this project, you will need to add the following environment variables:

- `PROJECT_NAME`: The name of the project
- `ENVIRONMENT`: The environment where the server is running. It could be 'development' or 'production'
- `PROJECT_VERSION`: The current version of the project
- `SERVER_HOSTNAME`: The hostname of the server
- `SERVER_PORT`: The port where the server will listening
- `MELI_SERVICE_URL`: The URL of the Mercado Libre API service
- `MELI_SERVICE_TOKEN`: The token for the Mercado Libre API service
- `MELI_SERVICE_FAKE_TOKEN`: A fake token for the Mercado Libre API service
- `MELI_SERVICE_TIMEOUT`: The timeout setting for the Mercado Libre API service
- `MELI_SERVICE_ITEMS_CACHE_TTL`: The time-to-live setting for the Mercado Libre API items cache
- `MELI_SERVICE_SEARCH_CACHE_TTL`: The time-to-live setting for the Mercado Libre API search cache

You can add these variables in a `.env` file at the root of your project:

```env
PROJECT_NAME=MeLi
ENVIRONMENT=development
PROJECT_VERSION=0.0.0
SERVER_HOSTNAME=localhost
SERVER_PORT=3030
MELI_SERVICE_URL=https://api.mercadolibre.com
MELI_SERVICE_TOKEN=e962f81a-4d42-4eb3-86cd-a25e7237c8dc
MELI_SERVICE_FAKE_TOKEN=55a4639f-55e8-4e14-a6cc-b79977b20a4e
MELI_SERVICE_TIMEOUT=3500
MELI_SERVICE_ITEMS_CACHE_TTL=20000
MELI_SERVICE_SEARCH_CACHE_TTL=5000
```

## Installation

To install this project follow these steps:

1. Clone the repository
```bash
git clone https://github.com/mau-io/meli-clean-architecture.git
```
2. Install the dependencies
```bash
npm install
```
3. Start the project
```bash
npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm run start`

Starts the application in the development mode.<br />
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

### `npm run watch`

This script is used to start the server and watch for any changes in the 'src' directory. The server will automatically restart whenever changes are detected.

### `npm run test`

This script is used to start the Jest test runner. 

### `npm run eslint`

This script is used to run ESLint which is a static code analysis tool for identifying problematic patterns found in JavaScript code. It's used for checking the code for readability, maintainability, and functionality errors.

### `npm run docs`

This script is used to generate documentation for the project using JSDoc.

  
## API Reference

## Overview
This API provides functionality to interact with the Mercado Libre marketplace. With this API, you can search for items and get item details. It provides endpoints to perform these operations.

## Endpoints

### Search Items

Performs a search for items in a specific Mercado Libre site.

```http
  GET /api/v1/search
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`   | `string` | **Required**. The search term     |
| `site`    | `string` | **Required**. The Mercado Libre site for the search. Must be one of: MLA, MLB, MLM |
| `sort`    | `string` | The sorting order. Can be one of: 'price_asc', 'price_desc' |
| `limit`   | `number` | The maximum number of results to return. Default is 50 |
| `offset`  | `number` | The number of results to skip before starting to return results. Default is 0 |

Response:
```
{
  "paging": {
    "total": Number,
    "offset": Number,
    "limit": Number
  },
  "categories": [String, ...],
  "items": [
    {
      "id": String,
      "title": String,
      "price": {
        "currency": String,
        "amount": Number,
        "decimals": Number
      },
      "picture": String,
      "condition": String,
      "free_shipping": Boolean
    },
    ...
  ]
}
```

#### Get Item

Fetches details of a specific item.

```http
  GET /api/v1/items/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `string` | **Required**. The Mercado Libre item Id.   |


Response:
```
{
  "author": {
    "name": String,
    "lastname": String
  },
  "item": {
    "id": String,
    "title": String,
    "price": {
      "currency": String,
      "amount": Number,
      "decimals": Number
    },
    "picture": String,
    "condition": String,
    "free_shipping": Boolean,
    "sold_quantity": Number,
    "description": String
  }
}
```

All requests must include an 'x-auth-token' header with one of the following values:

| Parameter      | Type     | Description                       |
| :--------      | :------- | :-------------------------------- |
| `x-auth-token` | `string` | Your Authentication token         |

**Note:** If the 'x-auth-token' header's value is `55a4639f-55e8-4e14-a6cc-b79977b20a4e`, mocked data will be returned.

## Sequence diagram
```
sequenceDiagram
    participant Client
    participant ExpressController
    participant AppController
    participant UseCase
    participant DataRepository
    participant HttpClient

    Client->>ExpressController: API Request (Client makes an API request to the server)
    ExpressController->>AppController: forwardRequest() (ExpressController forwards the request to AppController)
    AppController->>UseCase: execute() (AppController executes the corresponding use case)
    UseCase->>DataRepository: read() (UseCase asks for data from the repository)
    DataRepository->>HttpClient: fetch() (DataRepository uses HttpClient to get data)
    HttpClient-->>DataRepository: HTTP Response (HttpClient returns the HTTP response)
    DataRepository-->>UseCase: Data (DataRepository provides the fetched data to UseCase)
    UseCase-->>AppController: Data (UseCase returns the data to AppController)
    AppController-->>ExpressController: Response Data (AppController provides the response data to ExpressController)
    ExpressController-->>Client: API Response (ExpressController sends the API response back to the client)

```
[Diagram live](https://mermaid.live/edit#pako:eNqFVNFu2jAU_RXLT1QCVEgImR8qVXRS9zCp6rqXKS9ecqERxM5sp4Mh_n3Xsd2SmXY8Ed_jc46Pr--RlrICyqiGXx2IEu5qvlG8KQTBX8uVqcu65cKQ1a4GYeL1z_tWgdYrKYySux2oGHLbth-Vv2tYcQ1x4Y4b_git1LWR6hDX741pgy1XdV-Tm5vIFSO3D1_Ioz2lNmTkgKThW9CEi76ofNFIYp6BaFAvoK4cccSHGoNjMbKW6jdXlZcYXZFRtClgdC9wpjeg8pKDNZTzMTECeyg7A1ZhgAkFx15KheKtFFUtNqTTuIK7PbfnQtZhxgxN8coyewThequtbVIhkKyVbLz3sMUzDnmQ-O1yMBow5bNlHaKsK312izaJDZheytO-FScXzN4_PT3gndpTotXRGZMC0ynhkuhRyqMu2z2P15Yip62SL3Xlo-2PA5WLBD37rf9kG3eIYw7JnlsMTP_vg8u9_ZqBkxi2xcB7yOFVMmJ7t-NROlyoe0sh97jPNQjf5O5heeRPXm7D8yp7KhSjY9qAanhd4Rg6WvGCIqCBgjL8W8GadztT0EKcEMo7I78dREmZUR2MadfiQcLUomzNdxpXcTz8kLIJIPyk7Ej3lE2ST9M8W6bX-XK-SNNsmS3G9EBZtpwmyfU8ydJkliSz2fw0pn96hmSaJlmeztJ8mefpYj7DDVDZrvjqJmc_QE9_AY2_1mg
)


## Documentation

This project uses JSDoc to generate its documentation. The documentation will include details about all the JavaScript files found in the `./src` directory.

### Generating the Documentation

To generate the documentation, we use the following command:

```bash
npm run docs
```

### Viewing the Documentation

After running the command, the generated documentation will be available in the `./docs/` directory. You can open the `index.html` file in your browser to view the documentation.


# MeLi Application Docker Tutorial


This tutorial will walk you through the two basic Docker commands: `docker build` and `docker run`.

## Docker Build

The Docker `build` command is used to build Docker images from a Dockerfile and a context. The context is the set of files in the directory specified in the command, or in this case, the current directory (designated by the dot).

```bash
docker build -t app-meli .
```

Breaking down this command, `-t app-meli` is used to tag the image with the name `app-meli`, and `.` specifies that the Dockerfile is in the current directory.

After running this command, you'll have a Docker image named `app-meli` that's ready to run.

## Docker Run

The Docker `run` command is used to create a container from a Docker image and start the container.

```bash
docker run -p 3030:3030 --env-file .env app-meli
```

In this command, `-p 3030:3030` maps the host's port 3030 to the container's port 3030. This is essential for accessing web services running on the container. Following that, `app-meli` specifies the image to create the container from.

Once this command is executed, your application will be running in a Docker container and can be accessed at 
`http://localhost:3030`.

## Kubernetes Deployment

Once you have your Docker image, you can deploy your application to Kubernetes.

You can run the manifest with the `kubectl` command:

```bash
kubectl apply -f deployment.yaml
```

You can see the running Pods with:
```bash
kubectl get pods
kubectl get deployments
kubectl get services
```

You can delete the Pods with:
```bash
kubectl delete service my-app
kubectl delete deployment my-app
```

Now you can access your application through the LoadBalancer on your local machine at `http://localhost:3030`.


## Authors

- [@mau-io](https://www.github.com/mau-io)


## License

[MIT](https://choosealicense.com/licenses/mit/)

