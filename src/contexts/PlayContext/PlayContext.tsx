import {createContext} from 'react';
import {PlayContextProps} from './PlayInterfaces';

const PlayContext = createContext({} as PlayContextProps);

export default PlayContext;