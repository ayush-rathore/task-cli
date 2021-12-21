// Author - Ayush Rathore
// Version - 1.0

const fs = require("fs"); // Import the fileSystem module
const process = require("process"); // Import the process module

let args = process.argv; // Get the arguments from the command line

const argsLength = args.length; // Get the length of the arguments

let cmd = "",
	cmdStatement = "";
// Initialize the variables

for (let i = 2; i < argsLength; i++) {
	if (i == 2) cmd = args[i];
	// Get the command from the arguments
	else cmdStatement = args[i];
	// Get the command statement from the arguments
}

// Usage or Help command
if (cmd == "help" || argsLength < 3) {
	console.log(`Usage :-
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`);
}

// Listing all the tasks
if (cmd == "ls") {
	fs.readFile("task.txt", (err, data) => {
		if (err) console.log(`There are no pending tasks!`);
		else console.log(data.toString());
	});
}

// Adding tasks to task.txt
if (cmd == "add") {
	let priority = args[3];
	cmdStatement = args[4];
	if (priority == undefined || cmdStatement == undefined) {
		console.log("Error: Missing tasks string. Nothing added!");
	}
	fs.readFile("task.txt", (err, data) => {
		if (err) {
			var add = 1;
		} else {
			let lines = data.toString().split("\n");
			var add = lines.length;
		}
		let addStatement = `${add}. ${cmdStatement} [${priority}]\n`;
		fs.appendFile("task.txt", addStatement, (err) => {
			if (err) throw err;
			console.log(
				`Added task: "${cmdStatement}" with priority ${priority}`
			);
		});
	});
}

// Deleting tasks from task.txt
if (cmd == "del") {
	let index = args[3];
	if (index == undefined) {
		console.log("Error: Missing NUMBER for deleting tasks.");
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err) console.log(`There are no pending tasks!`);
			else {
				let lines = data.toString().split("\n");
				if (index >= lines.length || index < 1) {
					console.log(
						`Error: task with index #${index} does not exist. Nothing deleted.`
					);
				} else {
					lines.splice(index - 1, 1);
					let newLines = [];
					for (let i = 0; i < lines.length; i++) {
						let ind = parseInt(lines[i].split(".")[0]);
						if (i + 1 != ind) {
							ind = i + 1;
							newLines.push(`${ind}. ${lines[i].split(".")[1]}`);
						} else {
							newLines.push(`${ind}. ${lines[i].split(".")[1]}`);
						}
					}
					fs.writeFile("task.txt", newLines.join("\n"), (err) => {
						if (err) throw err;
						console.log(`Deleted task #${index}`);
					});
				}
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
			if (err) console.log(`There are no pending tasks!`);
			else {
				let lines = data.toString().split("\n");
				if (index > lines.length || index < 1) {
					console.log(
						`Error: no incomplete item with index #${index} exists.`
					);
				} else {
					let taskLines = [];
					let completeLines = [];
					for (let i = 0; i < lines.length; i++) {
						let ind = parseInt(lines[i].split(".")[0]);
						if (index == ind) {
							let compLen = 0;
							try {
								compLen = fs
									.readFileSync("completed.txt")
									.toString()
									.split("\n").length;
							} catch (err) {
								compLen = 0;
							}
							completeLines.push(
								`${compLen + 1}.${
									lines[i].split(".")[1].split(" [")[0]
								}`
							);
						} else {
							if (lines[i].split(".")[1] == undefined) {
								//pass
							} else {
								taskLines.push(
									`${taskLines.length + 1}.${
										lines[i].split(".")[1]
									}`
								);
							}
						}
					}
					fs.writeFile("task.txt", taskLines.join("\n"), (err) => {
						if (err) throw err;
						console.log("Marked item as done.");
					});
					fs.readFile("completed.txt", (err, data) => {
						if (err) {
							fs.writeFile(
								"completed.txt",
								completeLines.join("\n"),
								(err) => {
									if (err) throw err;
								}
							);
						} else {
							fs.appendFileSync(
								"completed.txt",
								"\n" + completeLines.join("\n"),
								(err) => {
									if (err) throw err;
								}
							);
						}
					});
				}
			}
		});
	}
}

// Generating report
if (cmd == "report") {
	fs.readFile("task.txt", (err, data) => {
		if (err) console.log("There are no pending tasks!");
		else {
			console.log(`Pending : ${data.toString().split("\n").length}`);
			console.log(`${data.toString()}\n`);
			fs.readFile("completed.txt", (err, data) => {
				console.log(
					`Completed : ${data.toString().split("\n").length}`
				);
				let lines = data.toString().split("\n");
				for (let i = 0; i < lines.length; i++) {
					console.log(lines[i]);
				}
			});
		}
	});
}
