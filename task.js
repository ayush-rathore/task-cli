// Author - Ayush Rathore
// Version - 2.0

const fs = require("fs"); // Import the fileSystem module
const process = require("process"); // Import the process module

const strings = require("node-strings");
const emoji = require("node-emoji");

let args = process.argv; // Get the arguments from the command line

let cmd = args[2]; // Get the command

// Usage or Help command
const help = () => {
	console.log(
		strings.green(
			strings.bold(
				`		╔════════════════════════════════════════════════════════════════╗`
			)
		)
	);
	console.log(
		strings.green(
			strings.bold(
				`		║                    Welcome to Task CLI                      	 ║`
			)
		)
	);
	console.log(
		strings.green(
			strings.bold(
				`		║  A command-line (CLI) program that lets you manage your tasks  ║`
			)
		)
	);
	console.log(
		strings.green(
			strings.bold(
				`		╚════════════════════════════════════════════════════════════════╝`
			)
		)
	);
	console.log(
		strings.blue(`Usage :-
$ ./task add 1 "Hello World"  # Add a new task with priority 2 and text "Hello World" to the list
$ ./task ls                   # Show incomplete tasks sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete task with the given index
$ ./task done INDEX           # Mark the incomplete task with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics`)
	);
};

// Adding tasks to task.txt
const add = () => {
	let priority = args[3];
	let cmdStatement = args[4];
	if (priority == undefined || cmdStatement == undefined) {
		console.log(
			strings.red(
				emoji.emojify(":x: Error: Missing tasks string. Nothing added!")
			)
		);
	} else {
		let currentDate = new Date();
		let dateString = currentDate.toISOString().substring(0, 10);
		let addStatement = "\n" + `${priority} ${cmdStatement} ${dateString}`;
		fs.appendFile("task.txt", addStatement, () => {
			console.log(
				strings.green(
					emoji.emojify(
						`:white_check_mark: Added task: "${cmdStatement}" with priority [${priority}]`
					)
				)
			);
		});
	}
};

// Deleting tasks from task.txt
const del = () => {
	let index = args[3];
	if (index == undefined) {
		console.log(
			strings.red(
				emoji.emojify(":x: Error: Missing NUMBER for deleting tasks.")
			)
		);
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err)
				console.log(
					strings.red(
						emoji.emojify(
							`:x: Error: item with index #${index} does not exist. Nothing deleted.`
						)
					)
				);
			else {
				let lines = data.toString().split("\n");
				lines.sort();
				if (lines[0] == "") lines.shift();
				if (index > lines.length || index < 1) {
					console.log(
						strings.red(
							emoji.emojify(
								`:x: Error: item with index #${index} does not exist. Nothing deleted.`
							)
						)
					);
				} else {
					lines.splice(index - 1, 1);
					fs.writeFile("task.txt", lines.join("\n"), () => {
						console.log(
							strings.green(
								emoji.emojify(
									`:white_check_mark: Deleted task with index #${index}`
								)
							)
						);
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
		console.log(
			strings.red(
				emoji.emojify(
					":x: Error: Missing NUMBER for marking tasks as done."
				)
			)
		);
	} else {
		fs.readFile("task.txt", (err, data) => {
			if (err)
				console.log(
					strings.red(
						emoji.emojify(
							`:x: Error: no incomplete item with index #${index} exists.`
						)
					)
				);
			else {
				let lines = data.toString().split("\n");
				lines.sort();
				if (lines[0] == "") lines.shift();
				if (index > lines.length || index < 1) {
					console.log(
						strings.red(
							emoji.emojify(
								`:x: Error: no incomplete item with index #${index} exists.`
							)
						)
					);
				} else {
					let complete = lines[index - 1].slice(1).trim().split(" ");
					let date = complete.pop();
					let completeStatement = `${complete.join(" ")} ${date}`;
					lines.splice(index - 1, 1);
					let incomplete = lines.join("\n");
					fs.writeFile("task.txt", incomplete, (err) => {
						if (err) throw err;
					});
					fs.appendFile(
						"completed.txt",
						"\n" + completeStatement,
						() => {
							console.log(
								strings.green(
									emoji.emojify(
										`:white_check_mark: Marked task with index #${index} as done`
									)
								)
							);
						}
					);
				}
			}
		});
	}
};

const readTasks = () => {
	fs.readFile("task.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log(
				strings.blue(
					emoji.emojify(
						`:open_file_folder: There are no pending tasks!\n`
					)
				)
			);
		else {
			let lines = data.toString().split("\n");
			lines.sort(function (a, b) {
				return a - b;
			});
			if (lines[0] == "") lines.shift();
			console.log(
				strings.yellow(
					emoji.emojify(`:pencil: Pending : ${lines.length}`)
				)
			);
			for (let i = 0; i < lines.length; i++) {
				let line = lines[i].split(" ");
				let priority = line[0];
				let date = line.pop();
				let task = line.slice(1).join(" ");
				console.log(
					`${
						i + 1
					}. Task: ${task}\n   Date Added: ${date}\n   Priority: [${priority}]\n`
				);
			}
		}
	});
	return Promise.resolve();
};

const readCompleted = () => {
	fs.readFile("completed.txt", (err, data) => {
		if (err || data.toString() == "")
			console.log(
				strings.blue(
					emoji.emojify(
						`:open_file_folder: There are no completed tasks!\n`
					)
				)
			);
		else {
			let lines = data.toString().split("\n");
			if (lines[0] == "") lines.shift();
			console.log(
				strings.green(
					emoji.emojify(
						`:card_file_box:  Completed : ${lines.length}`
					)
				)
			);
			for (let i = 0; i < lines.length; i++) {
				let completed = lines[i].split(" ");
				let date = completed.pop();
				console.log(
					`${i + 1}. Task: ${completed.join(
						" "
					)}\n   Date Completed: ${date}\n`
				);
			}
		}
	});
};

// Listing all the tasks
const ls = () => {
	readTasks();
};

// Generating report
const report = async () => {
	await readTasks();
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
