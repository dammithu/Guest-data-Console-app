import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { addGuest, deleteGuest, listGuest, readGuest, updateGuest } from "./guestdb.js";

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add a new guest',
    builder: {
      name: {
        describe: 'Guest name',
        demandOption: true,
        type: 'string'
      },
      address: {
        describe: 'Guest address',
        demandOption: true,
        type: 'string'
      },
      contact_no: {
        describe: 'Guest contact number',
        demandOption: true,
        type: 'string'
      },
      visit_date: {
        describe: 'Visit date',
        demandOption: true,
        type: 'string'
      }
    },
    handler(argv) {
      addGuest(argv.name, argv.address, argv.contact_no, argv.visit_date);
    }
  })
  .command({
    command: 'read',
    describe: 'Read a guest',
    builder: {
      id: {
        describe: 'Guest ID',
        demandOption: true,
        type: 'number'
      }
    },
    handler(argv) {
      readGuest(argv.id);
    }
  })
  .command({
    command: 'list',
    describe: 'List all guests',
    handler() {
      listGuest();
    }
  })
  .command({
    command: 'delete',
    describe: 'Delete a guest',
    builder: {
      id: {
        describe: 'Guest ID',
        demandOption: true,
        type: 'number'
      }
    },
    handler(argv) {
      deleteGuest(argv.id);
    }
  })
  .command({
    command: 'update',
    describe: 'Update a guest',
    builder: {
      id: {
        describe: 'Guest ID',
        demandOption: true,
        type: 'number'
      },
      name: {
        describe: 'Guest name',
        type: 'string'
      },
      address: {
        describe: 'Guest address',
        type: 'string'
      },
      contact_no: {
        describe: 'Guest contact number',
        type: 'string'
      },
      visit_date: {
        describe: 'Visit date',
        type: 'string'
      }
    },
    handler(argv) {
      updateGuest(argv.id, argv.name, argv.address, argv.contact_no, argv.visit_date);
    }
  })
  .parse();
