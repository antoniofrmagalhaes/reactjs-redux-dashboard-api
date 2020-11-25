import { container } from 'tsyringe'

import BCryptHashProvider from './HashProvider/BCryptHashProvider/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
