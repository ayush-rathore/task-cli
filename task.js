// Author - Ayush Rathore
// Version - 1.5

const fs = require("fs"); // Import the fileSystem module
const process = require("process"); // Import the process module

let args = process.argv; // Get the arguments from the command line

const argsLength = args.length; // Get the length of the arguments

let cmd = args[2]; // Get the command

// Usage or Help command
if (cmd == "help" || argsLength < 3) {
	console.log(`Usage :-
$ ./task add 2 "hello world"  # Add a new task with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list tasks sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete task with the given index
$ ./task done INDEX           # Mark the incomplete task with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
}

// Listing all the tasks
if (cmd == "ls") {
	fs.readFile("task.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log(`There are no pending tasks!`);
		else {
			let lines = data.toString().split("\n");
			lines.sort();
			if (lines[0] == "") lines.shift();
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i].split(" ");
				let priority = line.slice(0, 1).join();
				let task = line.slice(1).join(" ");
				console.log(`${i + 1}. ${task} [${priority}]`);
			}
		}
	});
}

// Adding tasks to task.txt
if (cmd == "add") {
	let priority = args[3];
	let cmdStatement = args[4];
	if (priority == undefined || cmdStatement == undefined) {
		console.log("Error: Missing tasks string. Nothing added!");
	} else {
		let addStatement = "\n" + `${priority} ${cmdStatement}`;
		fs.appendFile("task.txt", addStatement, (err) => {
			if (err) throw err;
			console.log(
				`Added task: "${cmdStatement}" with priority ${priority}`
			);
		});
	}
}

// Deleting tasks from task.txt
if (cmd == "del") {
	let index = args[3];
	if (index == undefined) {
		console.log("Error: Missing NUMBER for deleting tasks.");
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err) throw err;
			let lines = data.toString().split("\n");
			lines.sort();
			if (lines[0] == "") lines.shift();
			if (index > lines.length || index < 1) {
				console.log(
					`Error: item with index #${index} does not exist. Nothing deleted.`
				);
			} else {
				lines.splice(index - 1, 1);
				fs.writeFile("task.txt", lines.join("\n"), (err) => {
					if (err) throw err;
					console.log(`Deleted task with index #${index}`);
				});
			}
		});
	}
}

// Marking tasks as done
if (cmd == "done") {
	let index = args[3];
	if (index == undefined) {
		console.log("Error: Missing NUMBER for marking tasks as done.");
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err) throw err;
			let lines = data.toString().split("\n");
			lines.sort();
			if (lines[0] == "") lines.shift();
			if (index > lines.length || index < 1) {
				console.log(
					`Error: no incomplete item with index #${index} exists.`
				);
			} else {
				let complete = lines[index - 1].slice(1).trim();
				lines.splice(index - 1, 1);
				let incomplete = lines.join("\n");
				fs.writeFile("task.txt", incomplete, (err) => {
					if (err) throw err;
				});
				fs.appendFile("completed.txt", "\n" + complete, (err) => {
					if (err) throw err;
					console.log(`Marked task with index #${index} as done`);
				});
			}
		});
	}
}

// Generating report
if (cmd == "report") {
	fs.readFile("task.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log("There are no pending tasks!\n");
		else {
			let lines = data.toString().split("\n");
			if (lines[0] == "") lines.shift();
			console.log(`Pending : ${lines.length}`);
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i].split(" ");
				let priority = line.slice(0, 1).join();
				let task = line.slice(1).join(" ");
				console.log(`${i + 1}. ${task} [${priority}]\n`);
			}
		}
	});
	fs.readFile("completed.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log("There no completed tasks!");
		else {
			let lines = data.toString().split("\n");
			if (lines[0] == "") lines.shift();
			console.log(`Completed : ${lines.length}`);
			for (let i = 0; i < lines.length; i++) {
				console.log(`${i + 1}. ${lines[i]}`);
			}
		}
	});
}
