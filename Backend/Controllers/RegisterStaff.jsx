export const registerStaff= async(req, res)=>{
    const {FirstName, LastName, Mobile, Email, Designation} = req.body;

    try{
        //1. check if the user already exist
        const userExists = await User.findOne({Mobile});

        if(userExists){
            return res.status(400).json({
                message: 'A user with this mobile no already exists'});
        } 

        //2. Create the staff user
        //Note we do not set a password here. we leave it empty
        
        const newstaff = await User.create({
            FirstName,
            LastName,
            Mobile,
            Email: Email.toLowerCase();
            Role,             // eg. <designer
            Designation,      //
            isVerified: true // Admin created them, so we trust the identity
        });

        res.status(201).json({
            message: `${Role} created successfully`,
            user: {
                is: newstaff._id,
                Name: `${newstaff.FirstName} ${newstaff.LastName}`,
                Role: newstaff.Role
            }
        });
    } catch(error){
        console.error("Staff Registration Error: ", error);
        res.status(500).json({
            message: "Server Error while creating staff."});
    }
};
