const express = require("express");
const router = express.Router();
const { Contact, validateContact } = require("../model/contact");
const auth = require("../middleware/auth");

/******************************************************/

// route - /api/contacts/
// method - post
// type - private
// params - none
// to add the contact in the logged in user list
router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateContact(req.body);

    if (error) {
      return res
        .status(400)
        .send({ status: 1, message: error.details[0].message });
    }

    let tempFirstName = await Contact.findOne({
      firstName: req.body.firstName,
    });

    if (tempFirstName) {
      let lastName = await Contact.findOne({ lastName: req.body.lastName });

      // if first name and last name is present then contact is already available
      if (lastName) {
        return res.status(200).send({
          status: 1,
          message: "contact already exists with same firstName and lastName",
        });
      }
    }

    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      number:req.body.number,
      category: req.body.category,
      address: req.body.address,
      country: req.body.country,
      isBookMark: req.body.isBookMark,
      userID: req.user.id,
    });

    const contact1 = await contact.save();

    res
      .status(200)
      .send({ status: 0, message: "contact addedd", contact: contact1 });
  } catch (error) {
    console.log(`contacts - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contacts
// method - get
// type - private
// params - none
// get all contacts of specific loggedin user
router.get("/", auth, async (req, res) => {
  try {
    const id = req.user.id;

    let contacts = await Contact.find({ userID: id });
    // let contacts = await Contact.find();
    if (!contacts.length) {
      return res.status(200).send({ status: 0, message: "no contacts found!",contact:null });
    }

    res
      .status(200)
      .send({ status: 0, message: "contacts found", contact: contacts });
  } catch (error) {
    console.log(`contacts - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contact
// method - get
// type - private
// params - contactid
// body - userid
// get specific contact of specific loggedin user
router.get("/:contactID", auth, async (req, res) => {
  try {
    const userID = req.user.id;
    const contactID = req.params.contactID;

    let contacts = await Contact.find({ userID: userID, _id: contactID });

    if (!contacts.length) {
      return res.status(200).send({ status: 0, message: "no contacts found!", contact:null });
    }

    res
      .status(200)
      .send({ status: 0, message: "contacts found", contact: contacts });
  } catch (error) {
    console.log(`contacts - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contacts/:[boolean type value]
// method - get
// type - private
// params - none
// to get all the contacts with the bookmark
router.get("/:bookmark", auth, async (req, res) => {
  try {
    let id = req.user.id;

    const bookmark = req.params.bookmark;
    console.log(bookmark);
    if (bookmark === "true") {
      let contacts = await Contact.find({ userID: id, isBookMark: true });

      if (!contacts.length) {
        return res
          .status(200)
          .send({ status: 0, message: "no contacts found!" });
      }

      res
        .status(200)
        .send({ status: 0, message: "contacts found", contact: contacts });
    } else if (bookmark === "false") {
      let contacts = await Contact.find({ userID: id, isBookMark: false });

      if (!contacts.length) {
        return res
          .status(200)
          .send({ status: 0, message: "no contacts found!" });
      }

      res
        .status(200)
        .send({ status: 0, message: "contacts found", contact: contacts });
    } else {
      res.status(200).send({
        status: 1,
        message: "internal server error please provide proper parameter",
      });
    }
  } catch (error) {
    console.log(`contacts - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contacts/toggleBookmark
// method - put
// type - private
// params - none
// body - _id of document contact
// to toggle bookmark contact of logged in user
router.put("/toggleBookmark", auth, async (req, res) => {
  try {
    // get the userid from token
    const id = req.user.id;

    // get body parameters
    const contactID = req.body.contactID;

    // get the bookmark state
    let bookmarkState = await Contact.find({
      userID: id,
      _id: contactID,
    }).select("isBookMark");
    let toogleBookMark = !bookmarkState[0].isBookMark;
    // now here bydefault bookmark is false so no need to check whether its coming or not
    // now toggle it and update against that userid
    await Contact.update(
      { _id: contactID },
      { $set: { isBookMark: toogleBookMark } },
      function (err, doc) {
        if (err)
          res
            .status(500)
            .send({ status: 1, message: "unexpected error occured!" });

        return res.status(200).send({ status: 0, message: "bookmark toggled" });
      }
    );
  } catch (error) {
    console.log(`contacts toogle bookmark route main catch - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contacts/
// method - put
// type - private
// params - none
// body - contact (firstName,lastNae,address,country,isBookMark,category,and most imp id)
// to update information of logged in user
router.put("/", auth, async (req, res) => {
  const contactID = req.body._id;

  try {
    // this contact will always be found!
    let foundContact = await Contact.findById(contactID);

    // check did we able to find
    if (!foundContact) {
      return res.status(200).send({ status: 1, message: "no contact found" });
    }

    foundContact.firstName = req.body.firstName;
    foundContact.lastName = req.body.lastName;
    foundContact.address = req.body.address;
    foundContact.country = req.body.country;
    foundContact.email = req.body.email;
    foundContact.category = req.body.category;
    foundContact.isBookMark = req.body.isBookMark;

    const contact1 = await foundContact.save();

    return res
      .status(200)
      .send({ status: 0, message: "contact updated", contact: contact1 });
  } catch (error) {
    console.log(`contacts update route error main catch - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// route - /api/contacts/
// method - delete
// type - private
// params - none
// body - contactid
// to delete specific contact of logged in user
router.delete("/", auth, async (req, res) => {
  console.log(req);
  const contactID = req.body.id;
  try {
    let contactDeleted = await Contact.findByIdAndRemove({ _id: contactID });

    if (!contactDeleted) {
      return res.status(200).send({ status: 1, message: "no contact found" });
    }

    return res.status(200).send({ status: 0, message: "contact deleted" });
  } catch(error) {
    console.log(`contacts delete route error main catch - ${error.message}`);
    res.status(500).send({ status: 1, message: "unexpected error occured!" });
  }
});

// export
module.exports = router;
