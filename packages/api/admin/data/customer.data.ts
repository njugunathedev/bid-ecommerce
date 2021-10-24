import { plainToClass } from "class-transformer";
import Customer from "../services/customer/customer.type";

const loadCustomers = (): Customer[] => {
  return plainToClass(Customer, [
    {
      id: "1",
      name: "James L. Frank",
      image: "https://randomuser.me/api/portraits/men/80.jpg",
      email: "jameslfrank@jourrapide.com",
      total_order: 20,
      total_order_amount: 2563,
      address: [
        {
          id: "12312",
          type: "primary",
          name: "Home",
          info: "27 Street, 2569 Heritage Road Visalia, CA 93291"
        },
        {
          id: "23423",
          type: "secondary",
          name: "Office",
          info: "33 Baker Street, Crescent Road, CA 65746"
        }
      ],
      contacts: [
        {
          id: "88234",
          type: "primary",
          number: "715-371-3507"
        },
        {
          id: "23439",
          type: "secondary",
          number: "715-371-3507"
        }
      ],
      card: [
        {
          id: "179012",
          type: "primary",
          cardType: "paypal",
          name: "james l. frank",
          lastFourDigit: 2349
        },
        {
          id: "987234",
          type: "secondary",
          cardType: "master",
          name: "james l. frank",
          lastFourDigit: 8724
        },
        {
          id: "424987",
          type: "secondary",
          cardType: "visa",
          name: "james l. frank",
          lastFourDigit: 4535
        },
        {
          id: "455599",
          type: "secondary",
          cardType: "visa",
          name: "james l. frank",
          lastFourDigit: 4585
        }
      ],
      creation_date: new Date()
    },
    {
      id: "2",
      name: "Andre M. Pollock",
      image:
        "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg",
      email: "andreMPollock@jourrapide.com",
      total_order: 30,
      total_order_amount: 6583,
      address: [
        {
          id: "265789",
          type: "primary",
          name: "Home",
          info: "43 Street, 2341 Road Visalia, Ny 24252"
        },
        {
          id: "325164",
          type: "secondary",
          name: "Office",
          info: "29 Eve Street, 543 Evenue Road, Ny 87876"
        }
      ],
      contacts: [
        {
          id: "12354",
          type: "primary",
          number: "937-667-7660"
        },
        {
          id: "32156",
          type: "secondary",
          number: "937-667-7660"
        }
      ],
      card: [
        {
          id: "053151",
          cardType: "paypal",
          name: "andre m. pollock",
          lastFourDigit: 8765
        },
        {
          id: "659000",
          cardType: "master",
          name: "andre m. pollock",
          lastFourDigit: 3201
        },
        {
          id: "9856+320",
          cardType: "visa",
          name: "andre m. pollock",
          lastFourDigit: 3245
        }
      ],
      creation_date: new Date()
    },

    {
      id: "3",
      name: "Debra J. Nguyen",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      email: "debraJNguyen@rhyta.com",
      total_order: 40,
      total_order_amount: 7832,
      address: [
        {
          id: "456984",
          type: "primary",
          name: "Home",
          info: "2852 Duck Creek Road Palo Alto, CA 94306"
        },
        {
          id: "657841",
          type: "secondary",
          name: "Office",
          info: "4107 Medical Center Drive Tampa, FL 33602"
        }
      ],
      contacts: [
        {
          id: "320654",
          type: "primary",
          number: "320-692-5287"
        },
        {
          id: "12462",
          type: "secondary",
          number: "320-692-5287"
        }
      ],
      card: [
        {
          id: "78302",
          cardType: "paypal",
          name: "Debra J. Nguyen",
          lastFourDigit: 6325
        },
        {
          id: "852300",
          cardType: "master",
          name: "Debra J. Nguyen",
          lastFourDigit: 5599
        },
        {
          id: "778899",
          cardType: "visa",
          name: "Debra J. Nguyen",
          lastFourDigit: 3210
        }
      ],
      creation_date: new Date()
    },

    

    
  ]);
};

export default loadCustomers;
