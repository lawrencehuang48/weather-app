import * as React from "react";

export default class FirstComponent extends React.Component<{}> {

        public render() {
                return (
                        <div className="centreText">
                                <form> Enter your city:<br/> 
                                        <input type="text" name="city" placeholder="City..."/><br/>
                                        <input type="text" name="country" placeholder="Country..."/><br/>
                                        <button id="submit">Submit</button>
                                </form>
                        </div>
                );
        }
}