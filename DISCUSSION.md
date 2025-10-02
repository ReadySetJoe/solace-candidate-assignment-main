# Solace Candidate Assessment Notes

## PR Notes

### [PR #1 - Favicon asset reorganization](https://github.com/ReadySetJoe/solace-candidate-assignment-main/pull/1)

A very quick PR to simply delete unused assets and move the existing Solace favicon to the right place. Performed as a quick change to test that the development environment was set up and changes were being reflected locally.

### [PR #2 - Server side filtering](https://github.com/ReadySetJoe/solace-candidate-assignment-main/pull/2)

This PR changes how the client and server interact. It removes the document querying for the user's search term, in favor of a state variable that is passed to the backend. This will increase the table's responsiveness and allow us to scale to our projected hundreds of thousands of advocates.

Further improvements:

1. Debounce the search bar - the GET request currently fires every time the user search term changes, which essentially could lead to us DDOS'ing our own server as our user quickly performs searches.
2. Query optimization - the specifications portion of our query is just a raw text comparison of a jsonb column, which will degrade as the number of records scales to hundreds of thousands. This could be improved by breaking up our search bar in the UI to query the specific fields (name, state, specialty) rather than just a generic search bar.

### [PR #3 - Development setup cleanup](https://github.com/ReadySetJoe/solace-candidate-assignment-main/pull/3)

Small PR to fix a bug in the schema where the "specialties" column was being set as "payload" which is less descriptive and inconsistent with the rest of the application.

### [PR #4 - UI update](https://github.com/ReadySetJoe/solace-candidate-assignment-main/pull/4)

This is the main PR for the UX/UI improvements. The major changes are as follows:

1. General styling - used tailwind classes to generally improve the look and feel of the table (spacing, typography, borders, etc.)
2. Condensed data - combined the first name, last name, and license field to a single column for readability
3. Component refactor - broke out the table and table rows into more general components. Could be further refactored for better reusability.
4. Specialties "See More" functionality - to accomodate our bulkiest column of data, shortened the specialties to only preview the first three entries and allow the user to expand and see the rest. This helps make our table rows more compact.

### [Final Functional Commit](https://github.com/ReadySetJoe/solace-candidate-assignment-main/commit/19c2da0653dbd201a5b842523f12f4316f8cb229)

This commit adds the final bit of functionality completed within the 2hr time limit. I prioritized pagination to prepare for the stated scale of advocate entries, so that the client wouldn't immediately try and load 100,000+ records. It's a very quick and dirty implementation, simply adding a page number and limit to the request. In the real world, I would've updated my endpoint to better support paginated payloads by returning page info (fields like `hasMore` and `totalCount`), but this solution works fairly well for a prototype.

This commit also includes a small optimization for mobile users. It hides the specialties column on mobile view to make the table more navigable on mobile (NOTE: this change is mostly to show I was considering mobile UX, in reality we'd only want to hide this column for mobile if there were some kind of advocate details page so the user can still access that data)

Note: This was intended to be a PR, but I accidentally pushed it as a commit on main directly. But that's what happens when you don't set up branch protection on `main` :)
