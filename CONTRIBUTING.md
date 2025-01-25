# Contributing to the project

Thank you for considering contributing to this project! Here are some guidelines to help with the process.

- [How to contribute 🚀](#how-to-contribute-)
- [Node version](#node-version)
- [Rules to follow before contributing 🚨](#rules-to-follow-before-contributing-)
- [Ways to contribute](#ways-to-contribute)

## How to contribute 🚀

1. **Fork the Repository:**

   - Fork this repository by clicking the "Fork" button in the top right corner of this page. This will create a copy of the repository in your GitHub account.

2. **Clone the Repository:**

   - Clone the forked repository to your local development environment.

   ```bash
   git clone git@github.com:Luizboaventura1/EzosFit
   cd EzosFit
   npm install
   npm run dev

   ```

3. **Create your firebase project**

- put the environment variables in the `.env.template` example.

4. **Firebase configuration**

- Create a document called "users" and another called "foods", and then add the Google login option to Firebase authentication

### .env.template

```
# Create a project in firebase and put your keys here
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=
```

## Node version

`v22.12.0`

## Rules to follow before contributing 🚨

### 1. Code changes

Before making any changes for a pull request, always create an issue to propose your idea first. This ensures that the change is discussed and approved beforehand, preventing unnecessary work if the proposal is not accepted.

## Ways to contribute

### 1. Issues

The quickest and simplest way to contribute is by opening an issue. Whether it's a bug, suggestion for improvement, question, or any idea that adds value to our project, feel free to open an issue. This helps us continuously improve.

### 2. Pull Request

For any improvements, refactoring, or corrections of small details, feel free to open a pull request. However, before doing so, you must first create an issue proposing the specific change. If the proposal is approved, you can proceed with opening the PR.
