import React, { useState } from 'react';

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

  // Generic method to calculate available space
  availableSpaceRate(): number {
    return (
      this.numPeople -
      (this.numNetworkSockets + this.numPowerSockets + this.numPhoneSockets +
       this.numChairs + this.numTables)
    );
  }
}

// Subclass for CommercialOffice
class CommercialOffice extends Office {
  availableSpaceRate(): number {
    return (
      this.numPeople -
      (this.numNetworkSockets + this.numPowerSockets +
       2 * this.numPhoneSockets + 2 * this.numChairs + this.numTables)
    );
  }
}

// Subclass for DeveloperOffice
class DeveloperOffice extends Office {
  availableSpaceRate(): number {
    return (
      this.numPeople -
      (3 * this.numNetworkSockets + 3 * this.numPowerSockets +
       this.numPhoneSockets + 1.5 * this.numChairs + this.numTables)
    );
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
  addPersonnel(): void {
    // Calculate the number of commercials and developers
    const commercialCount = this.offices.reduce(
      (count, office) => count + (office instanceof CommercialOffice ? office.numPeople : 0),
      0
    );
    const developerCount = this.offices.reduce(
      (count, office) => count + (office instanceof DeveloperOffice ? office.numPeople : 0),
      0
    );

    console.log(`Commercials: ${commercialCount}, Developers: ${developerCount}`);
    
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

  const handleAddPersonnel = () => {
    company.addPersonnel();
    setOfficeStates(company.getOfficeStates());
  };

  return (
    <div>
      <h1>Company Office Management</h1>
      <button onClick={handleAddPersonnel}>Add Personnel</button>
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










