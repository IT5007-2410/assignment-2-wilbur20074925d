// Q1: Traveller Data
const initialTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: '88885555',
    bookingTime: new Date(),
    seatNumber: '1',
    email: 'jack@example.com',
  },
  {
    id: 2,
    name: 'Rose',
    phone: '88884444',
    bookingTime: new Date(),
    seatNumber: '2',
    email: 'rose@example.com',
  },
];

// Q3: TravellerRow Component
function TravellerRow(props) {
  const { traveller } = props;
  return (
    <tr>
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.bookingTime.toString()}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.email}</td>
    </tr>
  );
}

// Q3: Display Component to render travellers table
function Display(props) {
  const travellerRows = props.travellers.map((traveller) => (
    <TravellerRow key={traveller.id} traveller={traveller} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Seat Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {travellerRows}
      </tbody>
    </table>
  );
}

// Q4: Add Traveller Form Component
class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.addTravellerForm;
    const name = form.travellerName.value;
    const phone = form.travellerPhone.value;
    const seatNumber = form.travellerSeat.value;
    const email = form.travellerEmail.value;

    // Validation for seat number > 0
    if (parseInt(seatNumber) <= 0 || isNaN(parseInt(seatNumber))) {
      alert("Seat number must be greater than 0!");
      return;
    }

    // Check if the seat is already taken
    const isSeatTaken = this.props.travellers.some(
      (traveller) => traveller.seatNumber === seatNumber
    );

    if (isSeatTaken) {
      alert("This seat is already occupied!");
      return;
    }

    // Check for unique traveller name
    const isNameUnique = this.props.travellers.every(
      (traveller) => traveller.name !== name
    );

    if (!isNameUnique) {
      alert("Traveller name already exists!");
      return;
    }

    // Create a new traveller object if validations pass
    const newTraveller = {
      id: Date.now(),
      name,
      phone,
      seatNumber,
      email,
      bookingTime: new Date(),
    };

    this.props.bookTraveller(newTraveller);
    form.reset();
  }

  render() {
    return (
      <form name="addTravellerForm" onSubmit={this.handleSubmit}>
        <input type="text" name="travellerName" placeholder="Name" required />
        <input type="text" name="travellerPhone" placeholder="Phone" required />
        <input type="text" name="travellerSeat" placeholder="Seat Number" required />
        <input type="email" name="travellerEmail" placeholder="Email" required />
        <button type="submit">Add Traveller</button>
      </form>
    );
  }
}

// Q5: Delete Traveller Form Component
class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.deleteTravellerForm;
    const travellerName = form.travellerName.value;
    this.props.deleteTraveller(travellerName);
    form.reset();
  }

  render() {
    return (
      <form name="deleteTravellerForm" onSubmit={this.handleSubmit}>
        <input type="text" name="travellerName" placeholder="Name" required />
        <button type="submit">Delete Traveller</button>
      </form>
    );
  }
}

// Q6: Homepage Component showing free/occupied seats
class Homepage extends React.Component {
  render() {
    const { travellers, totalSeats } = this.props;

    // Array to represent seat occupancy
    const seatOccupancy = Array(totalSeats).fill(false);

    // Mark seats as occupied based on travellers' seat numbers
    travellers.forEach((traveller) => {
      const seatNumber = parseInt(traveller.seatNumber);
      if (seatNumber > 0 && seatNumber <= totalSeats) {
        seatOccupancy[seatNumber - 1] = true; // Seat number 1 corresponds to index 0
      }
    });

    return (
      <div>
        <h2>Welcome to Ticket To Ride</h2>
        <p>Total Free Seats: {totalSeats - travellers.length}</p>
        <div>
          {seatOccupancy.map((isOccupied, index) => (
            <span
              key={index}
              style={{
                margin: '5px',
                padding: '5px',
                border: '1px solid',
                backgroundColor: isOccupied ? 'grey' : 'green',
              }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    );
  }
}

// Main TicketToRide Component
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = {
      travellers: [],
      selector: 1,
      totalSeats: 10,
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value) {
    this.setState({ selector: value });
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  // Add a traveller (Prevent overflow)
  bookTraveller(traveller) {
    const freeSeats = this.state.totalSeats - this.state.travellers.length;
    if (freeSeats === 0) {
      alert('No more seats available!');
      return;
    }

    this.setState((prevState) => ({
      travellers: [...prevState.travellers, traveller],
    }));
  }

  // Delete a traveller (Handle underflow)
  deleteTraveller(travellerName) {
    const travellerExists = this.state.travellers.some((traveller) => traveller.name === travellerName);
    if (!travellerExists) {
      alert('Traveller not found!');
      return;
    }

    this.setState((prevState) => ({
      travellers: prevState.travellers.filter((traveller) => traveller.name !== travellerName),
    }));
  }

  render() {
    let content;
    const freeSeats = this.state.totalSeats - this.state.travellers.length;

    if (this.state.selector === 1) {
      content = (
        <Homepage
          freeSeats={freeSeats}
          totalSeats={this.state.totalSeats}
          travellers={this.state.travellers}
        />
      );
    } else if (this.state.selector === 2) {
      content = <Display travellers={this.state.travellers} />;
    } else if (this.state.selector === 3) {
      content = (
        <Add
          bookTraveller={this.bookTraveller}
          travellers={this.state.travellers}
        />
      );
    } else if (this.state.selector === 4) {
      content = <Delete deleteTraveller={this.deleteTraveller} />;
    }

    return (
      <div>
        <h1>Ticket To Ride</h1>

        {/* Navigation Bar */}
        <div>
          <button onClick={() => this.setSelector(1)}>Homepage</button>
          <button onClick={() => this.setSelector(2)}>Display Travellers</button>
          <button onClick={() => this.setSelector(3)}>Add Traveller</button>
          <button onClick={() => this.setSelector(4)}>Delete Traveller</button>
        </div>

        {/* Render selected component */}
        {content}
      </div>
    );
  }
}

const element = <TicketToRide />;
ReactDOM.render(element, document.getElementById('contents'));