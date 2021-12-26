// Author - Ayush Rathore
// Version - 2.0

const fs = require("fs"); // Import the fileSystem module
const process = require("process"); // Import the process module

const colors = require("colors"); // Import the colors module

let args = process.argv; // Get the arguments from the command line

let cmd = args[2]; // Get the command

// Usage or Help command
const help = () => {
	console.log(
		`		|----------------------------------------------------------------|`
			.green
	);
	console.log(
		`		|                    Welcome to Task CLI                      	 |`.green
	);
	console.log(
		`		|  A command-line (CLI) program that lets you manage your tasks. |`
			.green
	);
	console.log(
		`		|----------------------------------------------------------------|`
			.green
	);
	console.log(
		`Usage :-
$ ./task add 2 "hello world"  # Add a new task with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list tasks sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete task with the given index
$ ./task done INDEX           # Mark the incomplete task with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`.yellow
	);
};

// Adding tasks to task.txt
const add = () => {
	let priority = args[3];
	let cmdStatement = args[4];
	if (priority == undefined || cmdStatement == undefined) {
		console.log("Error: Missing tasks string. Nothing added!".red);
	} else {
		let addStatement = "\n" + `${priority} ${cmdStatement}`;
		fs.appendFile("task.txt", addStatement, () => {
			console.log(
				`Added task: "${cmdStatement}" with priority ${priority}`.green
			);
		});
	}
};

// Deleting tasks from task.txt
const del = () => {
	let index = args[3];
	if (index == undefined) {
		console.log("Error: Missing NUMBER for deleting tasks.".red);
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err)
				console.log(
					`Error: item with index #${index} does not exist. Nothing deleted.`
						.red
				);
			else {
				let lines = data.toString().split("\n");
				lines.sort();
				if (lines[0] == "") lines.shift();
				if (index > lines.length || index < 1) {
					console.log(
						`Error: item with index #${index} does not exist. Nothing deleted.`
							.red
					);
				} else {
					lines.splice(index - 1, 1);
					fs.writeFile("task.txt", lines.join("\n"), () => {
						console.log(`Deleted task with index #${index}`.green);
					});
				}
			}
		});
	}
};

// Marking tasks as done
const done = () => {
	let index = args[3];
	if (index == undefined) {
		console.log("Error: Missing NUMBER for marking tasks as done.".red);
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err)
				console.log(
					`Error: no incomplete item with index #${index} exists.`.red
				);
			else {
				let lines = data.toString().split("\n");
				lines.sort();
				if (lines[0] == "") lines.shift();
				if (index > lines.length || index < 1) {
					console.log(
						`Error: no incomplete item with index #${index} exists.`
							.red
					);
				} else {
					let complete = lines[index - 1].slice(1).trim();
					lines.splice(index - 1, 1);
					let incomplete = lines.join("\n");
					fs.writeFile("task.txt", incomplete, (err) => {
						if (err) throw err;
					});
					fs.appendFile("completed.txt", "\n" + complete, () => {
						console.log(
							`Marked task with index #${index} as done`.green
						);
					});
				}
			}
		});
	}
};

const readTasks = async () => {
	await fs.readFile("task.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log(`There are no pending tasks!\n`.blue);
		else {
			let lines = data.toString().split("\n");
			lines.sort();
			if (lines[0] == "") lines.shift();
			console.log(`Pending : ${lines.length}`.yellow);
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i].split(" ");
				let priority = line[0];
				let task = line.slice(1).join(" ");
				console.log(`${i + 1}. ${task} [${priority}]`);
			}
		}
	});
};

const readCompleted = async () => {
	await fs.readFile("completed.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log(`There are no completed tasks!\n`.blue);
		else {
			let lines = data.toString().split("\n");
			if (lines[0] == "") lines.shift();
			console.log("");
			console.log(`Completed : ${lines.length}`.green);
			for (let i = 0; i < lines.length; i++) {
				console.log(`${i + 1}. ${lines[i]}`);
			}
		}
	});
};

// Listing all the tasks
const ls = () => {
	readTasks();
};

// Generating report
const report = () => {
	readTasks();
	readCompleted();
};

// Switch Case for all commands
switch (cmd) {
	case "help":
		help();
		break;
	case "ls":
		ls();
		break;
	case "add":
		add();
		break;
	case "del":
		del();
		break;
	case "done":
		done();
		break;
	case "report":
		report();
		break;
	default:
		help();
}
