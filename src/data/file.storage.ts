import { FileItem, FileOwner, FileType } from '../models/file.item.model';

const owner1: FileOwner = {
  name: 'FR',
  avatarUrl: 'assets/owners/fr.png',
};
const owner2: FileOwner = {
  name: 'AS',
  avatarUrl: 'assets/owners/as.png',
};
const owner3: FileOwner = {
  name: 'DM',
  avatarUrl: 'assets/owners/dm.png',
};
const owner4: FileOwner = {
  name: 'MS',
  avatarUrl: 'assets/owners/ms.png',
};
const owner5: FileOwner = {
  name: 'PB',
  avatarUrl: 'assets/owners/pb.png',
};
const owner6: FileOwner = {
  name: 'PK',
  avatarUrl: 'assets/owners/pk.png',
};

export const OWNERS: FileOwner[] = [
  owner1,
  owner2,
  owner3,
  owner4,
  owner5,
  owner6,
];

export const FILE_LIST: FileItem[] = [
  {
    id: '1',
    name: 'file 1',
    creation: new Date(),
    type: FileType.FILE,
    owners: [owner1, owner2],
    chequeado: false
  },
  {
    id: '95',
    name: 'empty folder',
    creation: new Date(),
    type: FileType.FOLDER,
    owners: [owner4],
    chequeado: false
  },
  {
    id: '99',
    name: 'new folder',
    creation: new Date(),
    type: FileType.FOLDER,
    owners: [],
    chequeado: false
  },
  {
    id: '3',
    name: 'ey brother',
    creation: new Date(),
    type: FileType.FILE,
    owners: [owner3, owner4, owner5, owner1],
    chequeado: false
  },
  {
    id: '2',
    name: 'aquatic',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    chequeado: false
  },
  {
    id: '45',
    name: 'abcd',
    creation: new Date(),
    type: FileType.FOLDER,
    owners: [...OWNERS],
    chequeado: false
  },
  {
    id: '5',
    name: 'another file with long name',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    parentId: '45',
    chequeado: false
  },
  {
    id: '7',
    name: 'of',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    parentId: '45',
    chequeado: false
  },
  {
    id: '9',
    name: 'new name for file',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    parentId: '45',
    chequeado: false
  },
  {
    id: '88',
    name: 'new file',
    creation: new Date(),
    type: FileType.FILE,
    owners: [],
    parentId: '99',
    chequeado: false
  },
];
