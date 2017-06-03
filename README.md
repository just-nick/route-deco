# route-deco

Basic decorators to setup express controllers without needing a route config file

## Usage
Setup your express app as normal then connect it to route-deco
```
import * as express from 'express';
import { configure } from 'route-deco';

var app = express();

// ...

configure(app);
```

Then create your controllers as classes. Name your files to match the pattern ``*.controller.ts``
```
@Controller()
export class MyController {
    @RouteMapping('get', '/path')
    public controllerMethod(req: Request, res: Response, next: NextFunction) {
        res.send('Hello World');
    }
}
```

Then just start your app. route-deco provides it's own binary which runs your app through ts-node and imports your controllers.
```
route-deco app.ts
```

Better documentation to follow...