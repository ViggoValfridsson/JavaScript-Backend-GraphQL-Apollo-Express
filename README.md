# Query examples:

- Query for all users and their posts:

```graphql
query {
  users {
    name
    description
    id
    posts {
      title
      content
      id
    }
  }
}
```

- Query for a specific user and their posts:

```graphql
query {
  user(id: "1") {
    name
    id
    description
    posts {
      title
      content
      id
    }
  }
}
```

- Query all posts and their authors:

```graphql
query {
  posts {
    title
    content
    id
    user {
      name
      id
      description
    }
  }
}
```

- Query a specific post and it's author:

```graphql
query {
  post(id: "1") {
    title
    content
    id
    user {
      name
      id
      description
    }
  }
}
```

# Mutation examples:

- Create user:

```graphql
mutation {
  userCreate(user: { name: "New user", description: "New description" }) {
    user {
      name
      id
      description
      posts {
        title
      }
    }
    userErrors {
      message
    }
  }
}
```

- Update user:

```graphql
mutation {
  userUpdate(id: "1", user: { name: "Viggo Updated", description: "Updated description" }) {
    userErrors {
      message
    }
    user {
      description
      id
      name
      posts {
        title
        content
      }
    }
  }
}
```

- Delete user

```graphql
mutation {
  userDelete(id: "1") {
    user {
      name
      id
      description
      posts {
        title
        content
      }
    }
    userErrors {
      message
    }
  }
}
```

- Create a new post

```graphql
mutation {
  postCreate(post: { title: "New post", content: "New content", authorId: "2" }) {
    post {
      title
      content
      id
      user {
        name
        description
        id
      }
    }
    userErrors {
      message
    }
  }
}
```