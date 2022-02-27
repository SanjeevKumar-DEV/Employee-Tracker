class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        if (typeof first_name !== 'string' || !first_name.trim().length) {
            throw new Error("Expected parameter 'first name' to be required parameter");
        }
        if (typeof last_name !== 'string' || !last_name.trim().length) {
            throw new Error("Expected parameter 'last name' to be required parameter");
        }
        if (typeof role_id !== 'string' || !role_id.trim().length) {
            throw new Error("Expected parameter 'role id' to be required parameter");
        }
        
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    getFirstName() {
        return this.first_name;
    }
    getLastName() {
        return this.last_name;
    }
    getRoleId() {
        return this.role_id;
    }
    getManagerId() {
        return this.manager_id;
    }

}

module.exports = Employee;