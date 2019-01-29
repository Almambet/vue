var app = new Vue({

    el: "#root",

    data: {
        showingAddModal: false,
        showingEditModal: false,
        showingDeleteModal: false,
        errorMessage: "",
        successMessage: "",
        tasks: [],
        newTask: {task: "", description: ""},
        clickedTask: {},
        search: 're'
    },

    mounted: function() {
        console.log("mounted");
        this.getAllTasks();
    },

    methods: {

        customFilter: function(task) {
            return task.name.indexOf(this.search) != -1;
        },

        getAllTasks: function(){
            axios.get("http://localhost/taskvue/api.php?action=read").then(function(response)
            {
                //console.log(response);
                if(response.data.error){
                    app.errorMessage = response.data.message;
                } else{
                    app.tasks = response.data.tasks;
                }
            });
        },

        saveTask: function(){
            //console.log(app.newTask);
            var formData = app.toFormData(app.newTask);

            axios.post("http://localhost/taskvue/api.php?action=create", formData).then(function(response)
            {
                console.log(response);
                app.newTask = {task: "", description: ""};

                if(response.data.error){
                    app.errorMessage = response.data.message;
                } else{
                    app.getAllTasks();
                }
            });
        },

        updateTask: function(){
            //console.log(app.newUser);
            var formData = app.toFormData(app.clickedTask);

            console.log(formData);

            axios.post("http://localhost/taskvue/api.php?action=update", formData).then(function(response){

                    app.clickedTask = {};
                    if(response.data.error){
                        app.errorMessage = response.data.message;
                    } else{
                        app.successMessage = response.data.message;
                        app.getAllTasks();
                    }
                });
        },

        deleteTask: function(){
            //console.log(app.newUser);
            var formData = app.toFormData(app.clickedTask);

            axios.post("http://localhost/taskvue/api.php?action=delete", formData).then(function(response){
                    app.clickedTask = {};
                    if(response.data.error){
                        app.errorMessage = response.data.message;
                    } else{
                        app.successMessage = response.data.message;
                        app.getAllTasks();
                    }
                });
        },

            selectTask(task){
                app.clickedTask = task;
                //console.log("task");
                //console.log(task);
            },

        toFormData: function(obj){
            var form_data = new FormData();
            for ( var key in obj ) {
                form_data.append(key, obj[key]);
            }
            return form_data;
        },

        clearMessage: function(){
            app.errorMessage = "";
            app.successMessage = "";
        }

    }

});