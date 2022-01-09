# Task CLI

A command-line (CLI) program that lets you manage your tasks.

## Usage

### 1. Help

Executing the command without any arguments, or with a single argument help prints the CLI usage.

![1.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/1.png)

### 2. List all pending tasks

Use the ls command to see all the tasks that are not yet complete, in ascending order of priority.

![2.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/2.png)

### 3. Add a new task

Use the add command to add a new task to the list. The text of the task should be enclosed within double quotes (otherwise only the first word is considered as the task text, and the remaining words are treated as different arguments).

![3.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/3.png)

### 4. Delete a task

Use the del command to remove a task by its index.

![4.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/4.png)

Attempting to delete a non-existent task displays an error message.

![4-1.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/4-1.png)

### 5. Mark a task as completed

Use the done command to mark a task as completed by its index.

![5.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/5.png)

Attempting to mark a non-existed task as completed displays an error message.

![5-1.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/5-1.png)

### 6. Generate a report

Shows the number of complete and incomplete tasks in the list.

![6.png](https://github.com/ayush-rathore/task-cli/raw/assets/assets/6.png)
