const doctorModel=require('../models/doctorModels')

const getDoctorInfo=async(req,res)=>{
    try{
        const doctor=await doctorModel.findOne({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'Get Doctor Info Success',
            data:doctor
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error retrieving doctor info',
            error
        })
    }
}

const updateProfileCtr=async(req,res)=>{
    try {
        const doctor = await doctorModel.findOneAndUpdate(
          { userId: req.body.userId },
          req.body
        );
        res.status(201).send({
          success: true,
          message: "Doctor Profile Updated",
          data: doctor,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Doctor Profile Update issue",
          error,
        });
      }
    };


const getDoctorByIdCtr=async(req,res)=>{
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(201).send({
      success: true,
      message: "Doctor fetched",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wrong ",
      error,
    });
  }
}
    
module.exports={ getDoctorInfo, updateProfileCtr,getDoctorByIdCtr };