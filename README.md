# Task CLI

A command-line (CLI) program that lets you manage your tasks.

## Usage

### 1. Help

Executing the command without any arguments, or with a single argument help prints the CLI usage.

```
$ ./task help
Usage :-
$ ./task add 2 "hello world"  # Add a new task with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete tasks sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete task with the given index
$ ./task done INDEX           # Mark the incomplete task with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics
```

### 2. List all pending tasks

Use the ls command to see all the tasks that are not yet complete, in ascending order of priority.

```
[index] [task] [priority]
```

Example:

```
$ ./task ls
1. change light bulb [2]
2. water the plants [5]
```

index starts from 1, this is used to identify a particular task to complete or delete it.

### 3. Add a new task

Use the add command to add a new task to the list. The text of the task should be enclosed within double quotes (otherwise only the first word is considered as the task text, and the remaining words are treated as different arguments).

```
$ ./task add 5 "the thing i need to do"
Added task: "the thing i need to do" with priority 5
```

### 4. Delete a task

Use the del command to remove a task by its index.

```
$ ./task del 3
Deleted task with index 3
```

Attempting to delete a non-existent task displays an error message.

```
$ ./task del 5
Error: task with index 5 does not exist. Nothing deleted.
```

### 5. Mark a task as completed

Use the done command to mark a task as completed by its index.

```
$ ./task done 1
Marked task as done.
```

Attempting to mark a non-existed task as completed displays an error message.

```
$ ./task done 5
Error: no incomplete task with index 5 exists.
```

### 6. Generate a report

Shows the number of complete and incomplete tasks in the list.

```
$ ./task report
Pending : 2
1. this is a pending task [1]
2. this is a pending task with priority [4]

Completed : 3
1. completed task
2. another completed task
3. yet another completed task
```

## Screenshots

![1.png](https://github.com/ayush-rathore/task-cli/raw/main/screenshots/1.png)
![2.png](https://github.com/ayush-rathore/task-cli/raw/main/screenshots/2.png)
![3.png](https://github.com/ayush-rathore/task-cli/raw/main/screenshots/3.png)
