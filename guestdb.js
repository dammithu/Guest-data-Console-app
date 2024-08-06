import chalk from "chalk";
import fs from "fs";

const db_file = "data.json";

const saveGuest = (guests) => {
  const dataJSON = JSON.stringify(guests);
  fs.writeFileSync(db_file, dataJSON);
};

const loadGuest = () => {
  try {
    if (!fs.existsSync(db_file)) {
      return []; // Return an empty array if the file does not exist
    }
    const dataBuffer = fs.readFileSync(db_file);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.error(chalk.red("Error loading data:", e));
    return [];
  }
};

export const addGuest = (name, address, contact_no, visit_date) => {
  const guests = loadGuest();
  const length = guests.length;
  let id = 1;
  if (length > 0) {
    id = guests[length - 1].id + 1;
  }
  guests.push({
    id: id,
    name: name,
    address: address,
    contact_no: contact_no,
    visit_date: visit_date,
  });

  saveGuest(guests);

  console.log(chalk.green("Data Saved..."));
};

export const deleteGuest = (id) => {
  const guests = loadGuest();
  const newGuests = guests.filter((guest) => guest.id !== id);
  if (guests.length > newGuests.length) {
    saveGuest(newGuests);
    console.log(chalk.red("Deleted guest with ID:", id));
  } else {
    console.log(chalk.red("No record found"));
  }
};

export const listGuest = () => {
  console.log(chalk.blue("Guest List"));
  const guests = loadGuest();
  guests.forEach((guest) => {
    console.log(guest);
  });
};

export const readGuest = (id) => {
  const guests = loadGuest();
  const guest = guests.find((guest) => guest.id === id);
  if (guest) {
    console.log(chalk.blue("Guest details for ID:", id));
    console.log(guest);
  } else {
    console.log(chalk.red(`Guest with ID ${id} not found.`));
  }
};

export const updateGuest = (id, name, address, contact_no, visit_date) => {
  const guests = loadGuest();
  const guestIndex = guests.findIndex((guest) => guest.id === id);

  if (guestIndex > -1) {
    if (name) guests[guestIndex].name = name;
    if (address) guests[guestIndex].address = address;
    if (contact_no) guests[guestIndex].contact_no = contact_no;
    if (visit_date) guests[guestIndex].visit_date = visit_date;

    saveGuest(guests);
    console.log(chalk.yellow("Record Updated", id));
  } else {
    console.log(chalk.red.inverse("No record found"));
  }
};
