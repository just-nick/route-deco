import { Controller, RouteMapping } from "./connect";

@Controller()
class DemoController {
    @RouteMapping('get', '/')
    public getSomething(req, res) {}
}