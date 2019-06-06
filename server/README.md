
#Reviews Module
This module is part of a restaurant reservation service. The module displays reviews for 10 million restaurants around the world.

## REST APIs

**GET**

* URL
```'/:id/reviews'```
```'/:id/summary'```

* Method
```GET```

* URL Params

Required:

id=[integer]

* Data Params

```{
"location": string,
"noise": string,
"recommendPercent": integer,
"valueRating": string,
"averageOverall": string,
"averageFood": string,
"averageAmbience": string,
"averageService": string
}
```
* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

**POST**

* URL
```'/:id/reviews'```
```'/:id/summary'```

* Method
```POST```

Create a new review for a specific restaurant

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

**PUT**

* URL
```'/:id/reviews'```
```'/:id/summary'```

* Method
```PUT```

Edit an existing review for a specific restaurant

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

**DELETE**

* URL
```'/:id/reviews'```
```'/:id/summary'```

* Method
```DELETE```

Delete an existing review for a specific restaurant

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500