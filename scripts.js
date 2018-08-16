// our list of VIPs to display
// (All rise for the National Anthem)
const royals = [{
    name: "Elizabeth",
    gender: "f",
    id: 0
}, {
    name: "Charles",
    gender: "m",
    id: 1
}, {
    name: "Harry",
    gender: "m",
    id: 3
}, {
    name: "Meghan",
    gender: "f",
    id: 2
}];

// extremely generalized HOC to apply a given mapping function to a given component
// by transforming its props
const withManipulateProps = mappingFunction => BaseComponent => baseProps => {
    const mappedProps = mappingFunction(baseProps);
    // replace the props with mapped props
    return <BaseComponent {...mappedProps} />;
};

// HOC for setting up state (gender), applying it to component
// we default to this state to begin with
const withStartingState = defaultState => BaseComponent => {
    return class withStartingState extends React.Component {
        constructor(props) {
            super(props); // inheriting parent props
            this.state = {value: defaultState}; // set current state (default)
        };
        render() {
            return (
                <BaseComponent
                    {...this.props}
                    currentState={this.state.value}
                />
            );
        };
    };
};

// create the DOM elements for our list
const renderList = ({dataList}) => (
    <div>
        {dataList.map(member =>
            <div key={member.id}>
                <div>Name: {member.name}</div>
                <div>Gender: {member.gender}</div>
            </div>
        )}
    </div>
);

// transform the props (the list etc) and prepare this data for rendering to DOM
// we will need to check whether each item matches the current chosen 'state', i.e. gender
const FilteredDataSet = withManipulateProps(({dataList, currentState}) => {
    return {
        dataList: dataList.filter(member => member.gender === currentState)
    };
})(renderList);

// make a list that can initially lists only male ("m") but can be modified as required
// we set the starting state and apply that to the list
const DynamicFilteredList = withStartingState("m")(FilteredDataSet);

// finally rendering it all on the page :)
ReactDOM.render (
    <DynamicFilteredList dataList={royals} />,
    document.querySelector("#root")
);
