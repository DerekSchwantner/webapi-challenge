- [ ] Mention two parts of Express that you learned about this week.

ANSWER:

1. Express offers some essential core features like middleware, routing, convenience helpers.
2. Express can have views that live entirely on the back end so there could possibly be no need to build out a react app or other things like that to render views.

- [ ] Describe Middleware?

ANSWER: it is a function that gets the homies(req,res,) and performs operations on them. They can log actions from users, or possibly block certain things via authetication. It can change the req or res but is not necessary.

- [ ] Describe a Resource?

ANSWER: Everything that you interact with is a resource. Each one can be identified via unique URI, and can be text files, images, html pages, videos, etc.

- [ ] What can the API return to help clients know if a request was successful?

ANSWER: Status codes such as 201 (created) or 200 (OK)

- [ ] How can we partition our application into sub-applications?

ANSWER: Express Routers. we can make the application more modular and easier to understand.
