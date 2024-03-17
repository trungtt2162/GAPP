using GenealogyBL.Interfaces;
using GenealogyCommon.Models;
using GenealogyDL.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GenealogyBL.Implements
{
    internal class FeedbackBL: BaseBL<FeedBack>, IFeedbackBL
    {
        private readonly IFeedbackDL _feedbackDL;
        public FeedbackBL(IFeedbackDL feedbackDL, IWebHostEnvironment env) : base(env, feedbackDL)
        {
            _feedbackDL = feedbackDL;
        }

    }
}
