﻿using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace tracking.Utils
{
    public class ApplicationLogging
    {
        private static ILoggerFactory _Factory = null;

        public static void ConfigureLogger(ILoggerFactory factory) => factory.AddFile("Logs/sysLog-{Date}.log", LogLevel.Error); //serilog file extension

        public static ILoggerFactory LoggerFactory
        {
            get
            {
                if (_Factory == null)
                {
                    _Factory = new LoggerFactory();
                    ConfigureLogger(_Factory);
                }
                return _Factory;
            }
            set { _Factory = value; }
        }
        public static ILogger CreateLogger() => LoggerFactory.CreateLogger("TrackingApp");
    }
}
