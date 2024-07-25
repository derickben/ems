const Employee = require('../models/Employee');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString,GraphQLBoolean, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        title: {type: GraphQLString},
        dateOfJoining: {type: GraphQLString},
        department: {type: GraphQLString},
        employeeType: {type: GraphQLString},
        age: {type: GraphQLInt},
        currentStatus: {type: GraphQLBoolean},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        employees: {
            type: new GraphQLList(EmployeeType),
            resolve(parent, args) {
               return Employee.find();
            }
        },
        employee: {
            type: EmployeeType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Employee.findById(args.id);
            }
        },
    }
});

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                firstName: {type: GraphQLNonNull(GraphQLString)},
                lastName: {type: GraphQLNonNull(GraphQLString)},
                dateOfJoining: {type: GraphQLString},
                title: {
                    type: new GraphQLEnumType({
                        name: "EmployeeTitle",
                        values: {
                            "Employee": { value: "Employee"},
                            "Manager": { value: "Manager"},
                            "Director": { value: "Director"},
                            "VP": { value: "VP"},
                        }
                    }),
                    defaultValue: "Employee"
                },
                department: {
                    type: new GraphQLEnumType({
                        name: "EmployeeDepartment",
                        values: {
                            "IT": { value: "IT"},
                            "Marketing": { value: "Marketing"},
                            "Engineering": { value: "Engineering"},
                            "HR": { value: "HR"},
                        }
                    }),
                    defaultValue: "IT"
                },
                employeeType: {
                    type: new GraphQLEnumType({
                        name: "EmployeeType",
                        values: {
                            "FullTime": { value: "FullTime"},
                            "PartTime": { value: "PartTime"},
                            "Contract": { value: "Contract"},
                            "Seasonal": { value: "Seasonal"},
                        }
                    }),
                    defaultValue: "FullTime"
                },
                age: {type: (GraphQLInt)}
            },
            resolve(parent, args) {
                const employee = new Employee({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    title: args.title,
                    dateOfJoining: args.dateOfJoining,
                    department: args.department,
                    employeeType: args.employeeType,
                    age: args.age
                });
                return employee.save();
            }
        },

        deleteEmployee: {
            type: EmployeeType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, args) {
                return Employee.findByIdAndDelete(args.id);
            }
        },

        updateEmployee: {
            type: EmployeeType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID) },
                title: {
                    type: new GraphQLEnumType({
                        name: "EmployeeTitleUpdate",
                        values: {
                            "employee": { value: "Employee"},
                            "manager": { value: "Manager"},
                            "director": { value: "Director"},
                            "vp": { value: "VP"},
                        }
                    }),
                },
                department: {
                    type: new GraphQLEnumType({
                        name: "EmployeeDepartmentUpdate",
                        values: {
                            "it": { value: "IT"},
                            "marketing": { value: "Marketing"},
                            "engineering": { value: "Engineering"},
                            "hr": { value: "HR"},
                        }
                    }),
                },
                currentStatus: {type: (GraphQLBoolean)}
            },
            resolve(parent, args) {
                return Employee.findByIdAndUpdate( args.id,
                    {
                      $set: {
                        title: args.title,
                        department: args.department,
                        currentStatus: args.currentStatus
                      },
                    },
                    { new: true })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})