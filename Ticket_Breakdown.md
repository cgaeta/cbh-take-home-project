# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Add a `FacilityAgent` Table
  - This new table will represent a many-to-many relation between Agents and Facilities, as an Agent could be booked at Shifts posted by various facilities
  - Each entry in this table will include a relation to an Agent, a Facility, and a custom id
  - The custom id / Facility id pair must be unique, ie. the custom id is unique within each Facility
  - Estimated effort: Small
- Allow Facilities to update custom Agent ids for Agents they work with
  - Create an endpoint where Facilities are authorized to update the custom id for the agents they work with
  - Facilities should only be able to modify the custom id for Agents within their entry in `FacilityAgent` ie. no Facility can view or modify the custom ids other Facilities use for a given agent
  - Add a form where Facilities can update the custom id for Agents they work with
  - Estimated effort: Medium
- Return custom ids from `FacilityAgent` in `getShiftsByFacility`
  - Queries for Agent data in `getShiftsByFacility` need a join on the `FacilityAgent` table through the Facility's id and the Agents' ids
  - Agents' custom id for the facility should be included in each Agent's metadata
  - Reports should not include custom ids for Agents assigned by other Facilities
  - Estimated effort: Small (assuming only `generateReport` depends on `getShiftsByFacility`)
- Use custom ids from `FacilityAgent` in `generateReport`
  - The PDF returned should include Agents' custom id in place of their internal database id, if a custom id has been assigned
  - Estimated effort: Small

### Notes about effort estimates

For my effort estimates, I'm using T-shirt sizes. These estimates are intentionally broad, typically used to avoid spending too much time estimating the time required for a task.

Small: Changes required are localized to a single file, typically don't affect data in other files

Medium: Changes are either required in multiple locations, or a change can affect multiple dependencies. Need to make sure the work doesn't break functionality in other areas and work accordingly

Large: Changes are required in, or affect a collection of multiple, interdependent services or files.
