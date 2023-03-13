Responsive table component :

Wrap the following component.
https://react-bootstrap.github.io/components/table/

Basic example usage would be.
<ResponsiveTable data={users} striped hover bordered>

data is expected to be formatted for display. array of objects.

Responsive functionality.
Sort by key (number, string). Clickable headings
Fuzzy search. Add a search field to the table and only display matching data.
Pagination. lower prio. imagine you get 5000 rows. limit={50}and automatically create page 1,2,3,4,5 etc.

Start with the most basic functionalities. 
Both sorting and searching can be down with Array.sort and Array.filter 


  fuzzy search for strings
  results = results.filter(item => item.key.toLowerCase().includes(search));
 
||-----||

 let users = [{id: 1, email: "john@doe.nl", password:"asdasdasdasdasd", name:"asdasdasdasdasd"},{id: 1, email: "john@doe.nl", password:"asdasdasdasdasd", name:"asdasdasdasdasd"},{id: 1, email: "john@doe.nl", password:"asdasdasdasdasd", name:"asdasdasdasdasd"},{id: 1, email: "john@doe.nl", password:"asdasdasdasdasd", name:"asdasdasdasdasd"},{id: 1, email: "john@doe.nl", password:"asdasdasdasdasd", name:"asdasdasdasdasd"},  ]; // array of users

users = users.map((user: any) => {
    user.password = undefined;
    user.id = undefined;
    user.naam = user.name;
    user.name = undefined;
    return user;
});


<ResponsiveTable data={users} />