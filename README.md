### Tweet-ulator

#### Demo and setup locally

The working demo for this can be found at [https://tweet-ulator.vercel.app/](https://tweet-ulator.vercel.app/)

To start the project locally:

1. Rename `.env.example` to `.env`
2. Rename `backend/.env.example` to `backend/.env`
3. Run `docker-compose up`. The frontend will take a while to start in the first time due to installing packages
4. Visit [http://localhost:3000](http://localhost:3000)

#### Notes

1. I place the `backend` inside the frontend repository for faster deployment to Vercel. In real project, that should be in separate repository
2. In this test, I only handle integer numbers for the input
3. The login feature is just a placeholder, when logging in, I simply set the username as the author for replies/messages, password doesn't do anything here
4. For simplicity, I locked the thread to a single tree for each starting message, no branching. Supporting branching should not be an issue, just some more frontend works
5. Messages storage approach:

  - I decided to save them flat (instead of sub-documents) because this will help us manage the endless replying levels better. For example, when adding a reply, we just need the parent ID instead of all upper-level IDs
  - I used [Graph Lookup](https://docs.mongodb.com/manual/reference/operator/aggregation/graphLookup/) to get the top-level messages and their replies inside. This will help us to support paging later instead of returning all messages and depend on the frontend to build the tree
