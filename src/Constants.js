
import HomeScreen from './components/home/HomeScreen';
// import SettingsScreen from './components/settings/SettingsScreen';
import UsersScreen from './components/users/UsersScreen';
import ControlModulesScreen from './components/controlModules/ControlModulesScreen';
import PlacesScreen from './components/places/PlacesScreen';
import EventsScreen from './components/events/EventsScreen';
import AboutScreen from './components/about/AboutScreen';
import InsertUserScreen from './components/users/InsertUserScreen';
import InsertPlaceScreen from './components/places/InsertPlaceScreen';
import DoorLockInsertScreen from './components/doorLocks/DoorLockInsertScreen';
import DoorLockScreen from './components/doorLocks/DoorLockScreen';
import RfIdCardsScreen from './components/rfIdCards/RfIdCardsScreen';
import RfIdCardsInsertScreen from './components/rfIdCards/RfIdCardsInsertScreen';
import InsertControlModuleScreen from './components/controlModules/InsertControlModuleScreen';
import InsertEventScreen from './components/events/InsertEventScreen';
import InsertCredentialsScreen from './components/controlModules/InsertCredentialsScreen';
import InsertInstrumentScreen from './components/controlModules/InsertInstrumentScreen';

const navigationOptionsHide = ({ navigation }) => ({
    drawerLabel: () => null
});


const homeImg = require('../imgs/home.png');
const controlModulesImg = require('../imgs/control_modules.png');
const eventsImg = require('../imgs/events.png');
const usersImg = require('../imgs/users.png');
const rfIdCardsImg = require('../imgs/card.png');
const doorLocksImg = require('../imgs/door_locks.png');
const placesImg = require('../imgs/places.png');
const aboutImg = require('../imgs/about.png');


export const constNavigation = {
    home: {
        route: 'home',
        screen: HomeScreen,
        title: 'Home',
        img: usersImg
    },
    controlModules: {
        route: 'controlModules',
        screen: ControlModulesScreen,
        title: 'Módulos de controle',
        img: controlModulesImg
    },
    events: {
        route: 'events',
        screen: EventsScreen,
        title: 'Eventos',
        img: eventsImg
    },
    users: {
        route: 'users',
        screen: UsersScreen,
        title: 'Usuários',
        img: usersImg
    },
    rfIdCards: {
        route: 'rfIdCards',
        screen: RfIdCardsScreen,
        title: 'Cartões RF-ID',
        img: rfIdCardsImg
    },
    doorLocks: {
        route: 'doorLocks',
        screen: DoorLockScreen,
        title: 'Portas',
        img: doorLocksImg
    },
    places: {
        route: 'places',
        screen: PlacesScreen,
        title: 'Locais',
        img: placesImg
    },
    about: {
        route: 'about',
        screen: AboutScreen,
        title: 'Sobre',
        img: aboutImg
    },
    insertUser: {
        route: 'insertUser',
        screen: InsertUserScreen,
        navigationOptions: navigationOptionsHide,
    },
    insertPlace: {
        route: 'insertPlace',
        screen: InsertPlaceScreen,
        navigationOptions: navigationOptionsHide,
    },
    insertDoorLock: {
        route: 'insertDoorLock',
        screen: DoorLockInsertScreen,
        navigationOptions: navigationOptionsHide,
    },
    insertRfIdCard: {
        route: 'insertRfIdCard',
        screen: RfIdCardsInsertScreen,
        navigationOptions: navigationOptionsHide
    },
    insertControlModule: {
        route: 'insertControlModule',
        screen: InsertControlModuleScreen,
        navigationOptions: navigationOptionsHide
    },
    insertEvent: {
        route: 'insertEvent',
        screen: InsertEventScreen,
        navigationOptions: navigationOptionsHide
    },
    insertCredentialsScreen: {
        route: 'insertCredentialsScreen',
        screen: InsertCredentialsScreen,
        navigationOptions: navigationOptionsHide
    },
    insertInstrumentScreen: {
        route: 'insertInstrumentScreen',
        screen: InsertInstrumentScreen,
        navigationOptions: navigationOptionsHide
    }
};

export const colors = {
    backgroundMain: '#00a4d3',
    fontMain: 'white',
    backgroundSec: 'white',
    fontSec: 'black'
};

export const saveImg = require('../imgs/save.png');
export const cancelImg = require('../imgs/cancel.png');
export const editImg = require('../imgs/edit.png');
export const addImg = require('../imgs/add.png');
export const closeImg = require('../imgs/close.png');
export const refreshImg = require('../imgs/refresh.png');
export const deleteImg = require('../imgs/delete.png');
class Constants {
    
}

export default Constants;