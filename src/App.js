import './App.css';

let users = require('./component/data/data.json');

const listUserName = users.map((user) =>
    <li key={user.id}>{user.name}</li>
);

/*function searchUser(department) {
    users.map((user) =>
        user['departments'].map((departmentUser) => {
            if (departmentUser.toString() === department) {
                <li key={user.id}>{user.name}</li>
            }
        })
    );
}*/

const listDepartment = [];

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

//console.log('uniqueDepartments', uniqueDepartments)

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
            //nameUniqueDepartment.push(data['nom']);
            nameUniqueDepartment.push({'index': data['code'],'department': data['nom']});
        })
        .catch((error) => {
            console.error(error);
        });
})

//console.log('nameUniqueDepartment', nameUniqueDepartment)

/*const [value, setValue] = React.useState('');

const handleChange = (event) => {
    setValue(event.target.value);
};*/

/*const listDepartmentName = nameUniqueDepartment.map((item) =>
    <option value={item.index}>{item.department}</option>
);*/

const handleChange = event => {
    console.log(event.target.value);
};

function App() {
  return (
      <div>
          <ul>{listUserName}</ul>
          <label>
              Filtrer par département :
              <select onChange={handleChange} name="departments" id="department-select">
                  {nameUniqueDepartment.map((value) =>
                      <option key={value.index} value={value.index}>
                          {value.department}
                      </option>
                  )}
              </select>
          </label>
      </div>
  );
}

export default App;
