const mongoose = require("mongoose");
const task = require("./model/tasks.js");

mongoose.connect("mongodb://localhost/assignment", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .once("open", function () {
        console.log("Connection established!");
    })
    .on("error", function (error) {
        console.log("Connection error:", error);
    });

function add(desc, com) {
    var data = new task({
        Description: desc,
        Completed: com,
    });
    data.save().then(() => {
        console.log("New item got added!");
    });
}
function read() {
    task.find
        ({
            Completed: false
        }).then(function (result) {
            if (result.length !== 0) {
                result.forEach((res) => {
                    console.log(res);
                });
            } else {
                console.log("Read completed!");
            }
        });
}

function update() {
    task.updateMany
        ({
            Completed: false
        }, {
            Completed: true
        }).then(function (
            result
        ) {
            if (result.n !== 0) {
                console.log("Got updated succesfully");
            } else {
                console.log("Sorry! nothing to update here");
            }
        });
}

function deleteitem(data) {
    task.findOne({ Description: data }).then(function (result) {
        if (result !== null) {
            task.deleteOne({ _id: result._id }).then(function (res) {
                if (res.n !== 0) {
                    console.log(data + " deleted succesfully");
                } else {
                    console.log("No such task avaiable!");
                }
            });
        } else {
            console.log("No such task avaiable!");
        }
    });
}

add("Watch stige videos for completing projects", true);
add("Learn html and css to work on frontend", false);
add("the end", false);
read();
update();
deleteitem("the end");