import React, { useState } from 'react';
import './App.css';

// Base class for Office
class Office {
  constructor(
    public numNetworkSockets: number,
    public numPowerSockets: number,
    public numPhoneSockets: number,
    public numChairs: number,
    public numTables: number,
    public numPeople: number
  ) {}

  // Generic method to calculate available space, ensuring it doesn't go negative
  availableSpaceRate(): number {
    const availableSpace = this.numPeople - 
      (this.numNetworkSockets + this.numPowerSockets + this.numPhoneSockets + 
       this.numChairs + this.numTables);
    return Math.max(availableSpace, 0); // Ensure the available space is never negative
  }
}

// Subclass for CommercialOffice
class CommercialOffice extends Office {
  availableSpaceRate(): number {
    const availableSpace = this.numPeople - 
      (this.numNetworkSockets + this.numPowerSockets + 
       2 * this.numPhoneSockets + 2 * this.numChairs + this.numTables);
    return Math.max(availableSpace, 0); // Ensure the available space is never negative
  }
}

// Subclass for DeveloperOffice
class DeveloperOffice extends Office {
  availableSpaceRate(): number {
    const availableSpace = this.numPeople - 
      (3 * this.numNetworkSockets + 3 * this.numPowerSockets + 
       this.numPhoneSockets + 1.5 * this.numChairs + this.numTables);
    return Math.max(availableSpace, 0); // Ensure the available space is never negative
  }
}

// Class for Company managing multiple offices
class Company {
  private offices: Office[] = [];

  constructor() {
    // Adding 3 CommercialOffice and 2 DeveloperOffice with example values
    this.offices.push(new CommercialOffice(5, 5, 5, 5, 3, 10)); // Example values
    this.offices.push(new CommercialOffice(4, 4, 4, 4, 2, 8));
    this.offices.push(new CommercialOffice(6, 6, 6, 6, 4, 12));
    this.offices.push(new DeveloperOffice(3, 3, 3, 3, 3, 6));
    this.offices.push(new DeveloperOffice(2, 2, 2, 2, 2, 4));
  }

  // Method to add personnel
  addPersonnel(): boolean {
    // Calculate total available space
    const totalSpaceAvailable = this.offices.reduce(
      (total, office) => total + office.availableSpaceRate(),
      0
    );

    console.log(`Total available space: ${totalSpaceAvailable}`);

    if (totalSpaceAvailable > 0) {
      // Simulate adding personnel
      const isCommercial = Math.random() > 0.5; // Randomly decide if adding a commercial or developer
      if (isCommercial) {
        // Add to a random commercial office
        const index = Math.floor(Math.random() * 3); // Assuming first 3 are commercial
        if (this.offices[index] instanceof CommercialOffice) {
          this.offices[index].numPeople += 1;
        }
      } else {
        // Add to a random developer office
        const index = Math.floor(Math.random() * 2) + 3; // Assuming last 2 are developer
        if (this.offices[index] instanceof DeveloperOffice) {
          this.offices[index].numPeople += 1;
        }
      }
      return true; // Successfully added personnel
    } else {
      return false; // No available space to add personnel
    }
  }

  // Method to get office states
  getOfficeStates() {
    return this.offices.map((office, index) => ({
      index,
      availableSpaceRate: office.availableSpaceRate(),
      type: office instanceof CommercialOffice ? 'Commercial' : 'Developer',
      numPeople: office.numPeople
    }));
  }
}

// Main App component
const App: React.FC = () => {
  const [company] = useState(new Company());
  const [officeStates, setOfficeStates] = useState(company.getOfficeStates());
  const [message, setMessage] = useState<string>(''); // State for the message

  const handleAddPersonnel = () => {
    const success = company.addPersonnel();
    setOfficeStates(company.getOfficeStates());

    if (!success) {
      // If no space is available, display the message
      setMessage('There is no available space for adding new personnel.');
    } else {
      setMessage(''); // Clear the message when personnel is successfully added
    }
  };

  return (
    <div>
      <h1>Company Office Management</h1>
      <button onClick={handleAddPersonnel}>Add Personnel</button>

      {message && (
        <div className="notification">{message}</div>
      )}

      <h2>Office Status:</h2>
      <ul>
        {officeStates.map(office => (
          <li key={office.index}>
            {office.type} Office {office.index + 1}: 
            Available Space: {office.availableSpaceRate}, Occupied: {office.numPeople}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
