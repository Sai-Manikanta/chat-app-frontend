import { useContext } from 'react'
import { NavLink, useRouteMatch, Switch, Route } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import YourStatus from './YourStatus';
import PartnerStatus from './PartnerStatus';

function Status() {
    const { name } = useContext(AuthContext);
    const { url, path } = useRouteMatch();

    return (
        <div className="text-gray-600">
            <div className="flex">
                <NavLink 
                    to={`${url}/yours`}
                    activeClassName="bg-indigo-400 text-white"
                    className="border flex-grow text-center py-2 text-sm rounded-l border-r-0 bg-indigo-100"
                >
                    Your Status
                </NavLink>
                <NavLink 
                    to={`${url}/${name}`}
                    activeClassName="bg-indigo-400 text-white"
                    className="border flex-grow text-center py-2 text-sm rounded-r bg-indigo-100"
                >
                    {(name === 'Mani') ? 'Chinnu' : 'Mani'} Status
                </NavLink>
            </div>

            <div className="shadow mt-4 p-4 rounded">
                <Switch>
                    <Route path={`${path}/yours`}>
                        <YourStatus />
                    </Route>
                    <Route path={`${path}/${name}`}>
                        <PartnerStatus />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}

export default Status
