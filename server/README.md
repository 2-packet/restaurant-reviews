
#Reviews Module
This module is part of a restaurant reservation service. The module displays reviews for 10 million restaurants around the world.

## REST APIs

**GET**

* URL
```'/:id/reviews'```

* Method
```GET```

* URL Params

Required:

id=[integer]

* Sample Response

```{
"restaurant": int,
"text": string,
"date": date,
"overall": int,
"food": int,
"service": int,
"ambience": int,
"wouldrecommend": boolean,
"tags": string,
"firstname": string,
"lastname": string,
"city": string,
"avatarcolor": string,
"isvip": boolean,
"totalreviews": int
}
```

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

* URL
```'/:id/summary'```

* Method
```GET```

* URL Params

Required:

id=[integer]

* Sample Response

```{
"location": string,
"noise": string,
"recommendpercent": int,
"valuerating": int,
"averageoverall": int,
"averagefood": int,
"averageambience": int,
"averageservice": int,
"tags": string,
"firstname": string,
"lastname": string,
"city": string,
"avatarcolor": string,
"isvip": boolean,
"totalreviews": int
}
```

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

**POST**

* URL
```'/:id/reviews'```

* Method
```POST```

Create a new review for a specific restaurant

* Request Data:
  ```{
      "id(diners): int,
      "text": string,
      "overall": int,
      "food": int,
      "service": int,
      "ambience": int,
  }```

* Success Response:
    * Code: 200
* Error Response:
    * Code: 500

**PUT**

* URL
```'/:id/reviews'```

* Method
```PUT```

Edit an existing review for a specific restaurant

* Request Data:
  ```{
      "id(diners): int,
      "text": string,
      "overall": int,
      "food": int,
      "service": int,
      "ambience": int,
  }```

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