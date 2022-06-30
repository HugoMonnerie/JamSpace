import './App.css';

let users = require('./component/data/data.json');

const listUserName = users.map((user) =>
    <li key={user.id}>{user.name}</li>
);

/*function searchUser(department) {
    /*users.map((user) =>
        user['departments'].forEach(departmentUser => {
            if (departmentUser === department) {
                console.log(user.name)
            }
        }),
    );
}*/

var listDepartment = [];

users.forEach(user =>
    user['departments'].forEach(department => {
        listDepartment.push(department)
    })
);

const uniqueDepartments = [];

listDepartment.forEach((department, id) => {
    if (listDepartment.indexOf(department) === id){
        uniqueDepartments.push(department);
    }
})

console.log('uniqueDepartments', uniqueDepartments)

let nameUniqueDepartment = [];

uniqueDepartments.forEach((department) => {
    const url = 'https://geo.api.gouv.fr/departements/' + department;
    fetch(url)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            //nameUniqueDepartment = new Map({'department': data['nom']});
            nameUniqueDepartment.push(data['nom']);
        })
        .catch((error) => {
            console.error(error);
        });
})

console.log('nameUniqueDepartment', nameUniqueDepartment)

/*const [value, setValue] = React.useState('rien');

const handleChange = (event) => {
    setValue(event.target.value);
};*/



/*const department = [];

for (var i=0; i<nameUniqueDepartment.length; i++) {
    console.log('bli');
    department.push(nameUniqueDepartment[i]);
}

console.log('department', department)*/

/*let nameDepartments = Object.keys(nameUniqueDepartment).map(nameDepartment => {
    return (
        <option value={nameDepartment}>{`${nameDepartment}: ${nameUniqueDepartment[nameDepartment]}`}</option>
    );
});*/
function selector() {
    for (let i = 0; i < 22; i++) {
        <option value={nameUniqueDepartment[i]}>{nameUniqueDepartment[i]}</option>
    }
}

function App() {
  return (
      <div>
          <ul>{listUserName}</ul>
          <label>
              Filtrer par département :
              <select>
                  {selector}
              </select>
          </label>
      </div>
  );
}

export default App;
