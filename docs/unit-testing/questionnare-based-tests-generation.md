# Questionnaire based tests generation

## Why frontend is different?

I am a frontend developer since couple years. Frontend is this part of programming which is quite visible for the users
as it displays the interface we cooperate with. This has some impacts on testing too. I see a tendency at frontend of
not writing unit tests. I asked the devs at one of Facebook groups what is the unit tests coverage at their project.
Around 50% answered that they do not write unit tests [TODO: add source], but there is substantial group who tries to
reach around 100% coverage.

The situation at frontend differs this way from the other programming areas that quite a lot is visible. There is more
sureness about the code which functioning results you see than at the other programming fields, but this is illusive.
The sureness is misleading. It makes us writing less tests which causes more bugs.

## What is easy and what's not at frontend unit tests?

On the other hand frontend tests are quite simple. However, not always. Checking if a label is visible seems a
one-liner, but knowing that you need to mock data sources and translation layer seems already complicating! These two
lead to one very important outcome: as data sources and translations, and a lot of other things to mock are app-wide
this could be mocked in very generic way, but this is not a common programming pattern.

What about the controls selectors? At E2E tests there is Page Object Pattern which gathers all important selectors for
each page. This could be applied at unit tests, couldn't it?

## How would we define full test coverage?

The final part is how frontend testing differs from the rest of programming at area of functionality. Normally unit
tests cover positive scenarios, this is a must have. Then edge cases come, and this is also very advised. However,
frontend edge cases are not quite edge e.g. disabling a button happens quite often. It seems that at frontend all
combinations of state & props (on React example) have quite same importance. Most of the test checks on frontend are
possible to evolve into two test checks: positive or negative. A positive one is when a button is enabled, text or icon
is visible etc. while the negative counterpart is when a button is disabled, text or icon are invisible. At frontend we
likely want to check both ways to get full coverage. This leads to a questionnaire where each possible combination of
state and props has assigned a result which is a set of passing in positive or negative way of each test check. This is
unit test full test coverage of a component.

## What looks like an ideal frontend unit test framework?

There are couple of outcomes from the upper:

1) the tests checks are simple, and they rather need to be written manually based on selectors
2) The selectors are common for whole component, and they may be even generate from component code, or component code
   can be generated from them. They usually point to a label, button or an input field.
3) The questionnaire is a no-coding task and we just need to define all the expectations for a component.
4) Mocking is generic if the code quality is high, and we have app-wide mechanism for a lot of things at our app.

5) These all seem to sum up in a hypothesis that unit testing can maybe take 10% of the current time if the tests
   writing would be more automated. These all combined may also generate you standard JEST unit test set.

I am already in progress of writing this software. The first quite unsuccessful trial started with this package:
https://www.npmjs.com/package/react-component-testing-library
which does not really include the upper thoughts. Since then the software is developed as proprietary in client-server
architecture. It got a lot of improvements: the described above questionnare based test generation, some auto-mocking
tools, and test template generation. If any of you wants to try this out let me know. I look for first clients.

More or less how this works at `example2` directory.
