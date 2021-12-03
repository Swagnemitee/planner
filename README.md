# Planner

This is a web app that helps you plan and track your days. Keeping track of your tasks and visualizing them can increase your productivity and help you build habits. It has an intuitive and easy to use interface that you can costumize. \
The web app is hosted at [planner.swagnemite.com](https://planner.swagnemite.com). It is designed for use on a large screen, it does not work on mobile.
##### I do not have access any kind of data. All data is stored on your device locally.

## Features

- [x] - Create tasks and keep track of them as you complete
- [x] - Insert tasks into lists that be can automatically reset every day, week or month
- [x] - Organize lists into groups to keep your planner tidy and coherent
- [x] - Drag and drop tasks, lists and groups to quickly edit your planner
- [x] - Undo and redo every action to correct your mistakes

## How to Use

* Click on the plus sign on upper right corner to create a group
* Hovering the mouse over a group or list name creates two buttons that can be pressed to edit that group or list
* Click on the plus sign on a group to create a list in that group
* Click on the plus sign on a list to create a task in that group
* Click on the three dots to edit a list or a group
* Click on the number next to a task to complete that task once
* Click on a task's name to edit that task
* Click on the left arrow on upper right corner to undo the last change
* Click on the right arrow on upper right corner to redo the last undo

## Future Plans

If I continue working on this, there are a few features I want to implement:

- [ ] - Users can assign a value to tasks and they will be awarded with points when they complete these tasks
- [ ] - Users can add goals to groups and achieve them by earning a certain amount of points in that group
- [ ] - Keep track of the amount of points received on a daily, weekly and monthly basis
- [ ] - Users can check their past points and compare to their current progress

## Technologies Used

* [React](https://www.npmjs.com/package/react) to build the website
* [TypeScript](https://www.npmjs.com/package/typescript) to make JavaScript type enforced
* [dayjs](https://www.npmjs.com/package/dayjs) to take care of dates
* [sass](https://www.npmjs.com/package/sass) to have cleaner CSS files
* [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) to handle the drag and drop function
* [lodash](https://www.npmjs.com/package/lodash) to deal with objects and arrays easier